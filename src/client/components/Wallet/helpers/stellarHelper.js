const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org/');

export const loadAccount = (pubkey) => {
  return server.loadAccount(pubkey);
}

export const privkeyToPubkey = (privkey) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);
  return keypair.publicKey();
}

export const loadTrustlines = (balances) => {
  let loadingPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(balances);
    }, 250);
  });

  return loadingPromise.then((balances) => {
    let trustlines = [];
    balances.forEach(asset => {
      if (asset.asset_code == 'STRTMUSD') {
        let trustline = {
          balance: asset.balance,
          issuer: asset.asset_issuer,
          asset: asset.asset_code
        };
        trustlines.push(trustline);
      }
    });
    return trustlines;
  });
}

export const deleteTrustline = (privkey, accountId) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);
  let debtAsset = new StellarSdk.Asset('STRTMUSD', accountId);

  return server.loadAccount(keypair.publicKey())
  .then((acc) => {
    var transaction = new StellarSdk.TransactionBuilder(acc)
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: debtAsset,
        limit: "0"
      }))
      .build();
    transaction.sign(keypair);
    return server.submitTransaction(transaction);
  });
}

export const createTrustline = (privkey, accountId) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);
  let debtAsset = new StellarSdk.Asset('STRTMUSD', accountId);

  return server.loadAccount(keypair.publicKey())
  .then((acc) => {
    var transaction = new StellarSdk.TransactionBuilder(acc)
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: debtAsset
      }))
      .build();
    transaction.sign(keypair);
    return server.submitTransaction(transaction);
  });
}

export const createOffers = (privkey, buyIssuer, amount=1000, price=1) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);
  let selling = new StellarSdk.Asset('STRTMUSD', keypair.publicKey());
  let buying = new StellarSdk.Asset('STRTMUSD', buyIssuer);
  var acc = null;

  return server.loadAccount(keypair.publicKey())
  .then((account) => {
    acc = account;
    return server.offers('accounts', acc.account_id).call()
  }).then(offers => {
    let willCreateOffer = true;
    offers.records.forEach(offer => {
      if (offer.buying.asset_issuer == buying.issuer) {
        willCreateOffer = false;
      }
    });
    return willCreateOffer;
  }).then(canCreate => {
    if (canCreate) {
      var transaction = new StellarSdk.TransactionBuilder(acc)
        .addOperation(StellarSdk.Operation.createPassiveOffer({
          selling: selling,
          buying: buying,
          amount: amount,
          price: price
        }))
        .build();
      transaction.sign(keypair);
      return server.submitTransaction(transaction);
    } else {
      return false;
    }
  });
}

export const checkTrustlines = (pubkey, accountId) => {
  return server.loadAccount(accountId)
  .then(acc => {
    var isTrusted = false;
    acc.balances.forEach(asset => {
      if (asset.asset_code == 'STRTMUSD' && asset.asset_issuer == pubkey) {
        isTrusted = true;
      }
    });
    return isTrusted;
  });
}

export const issueAssets = (privkey, accountId, amount, note) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);
  let debtAsset = new StellarSdk.Asset('STRTMUSD', keypair.publicKey());

  return server.loadAccount(keypair.publicKey())
  .then(acc => {
    var transaction = new StellarSdk.TransactionBuilder(acc)
      .addOperation(StellarSdk.Operation.payment({
        destination: accountId,
        asset: debtAsset,
        amount: amount
      }));
    if (note) {
      let memo = new StellarSdk.Memo("text", note);
      transaction = transaction.addMemo(memo).build();
      transaction.sign(keypair);
      return server.submitTransaction(transaction);
    } else {
      transaction = transaction.build();
      transaction.sign(keypair);
      return server.submitTransaction(transaction);
    }
  });
}

export const attemptPathPayment = (privkey, accountId, amount, note) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);

  return server.loadAccount(accountId)
  .then(acc => {
    let trustlines = [];
    acc.balances.forEach(asset => {
      if (asset.asset_code == 'STRTMUSD') {
        trustlines.push(asset.asset_issuer);
      }
    });
    return trustlines
  }).then(trustlines => {
    return trustlines.map(trustline => {
      let destAsset = new StellarSdk.Asset('STRTMUSD', trustline);
      return server.paths(keypair.publicKey(), accountId, destAsset, amount).call()
      .then(paths => {
        if (paths.records.length > 0) {
          for (var i = 0; i < paths.records.length; i++) {
            if (paths.records[i].source_asset_code == 'STRTMUSD') {
              return paths.records[i];
            } else if (i == paths.records.length - 1) {
              return [];
            }
          }
        } else {
          return [];
        }
      });
    });
  }).then(promises => {
    return Promise.all(promises)
  }).then(unflattenedPaths => {
    return [].concat.apply([], unflattenedPaths);
  }).then(paths => {
    return pathPayment(
      privkey,
      paths,
      accountId,
      amount,
      note
    );
  });
}

const pathPayment = (privkey, paths, accountId, amount, note) => {
  if (paths.length == 0) {
    return false;
  } else {
    let path = paths[0];
    let keypair = StellarSdk.Keypair.fromSecret(privkey);

    return server.loadAccount(keypair.publicKey())
    .then(acc => {
      var transaction = new StellarSdk.TransactionBuilder(acc)
        .addOperation(StellarSdk.Operation.pathPayment({
          destination: accountId,
          sendMax: amount,
          sendAsset: new StellarSdk.Asset('STRTMUSD', keypair.publicKey()),
          destAsset: new StellarSdk.Asset('STRTMUSD', path.destination_asset_issuer),
          destAmount: amount,
          path: path.path.map(asset => new StellarSdk.Asset(asset.asset_code, asset.asset_issuer))
        }))
      if (note) {
        let memo = new StellarSdk.Memo("text", note);
        transaction = transaction.addMemo(memo).build();
      } else {
        transaction = transaction.build();
      }
      transaction.sign(keypair);
      return server.submitTransaction(transaction);
    });
  }
}

export const loadOffers = (pubkey) => {
  return server.loadAccount(pubkey)
  .then((account) => {
    acc = account;
    return server.offers('accounts', acc.account_id).call()
  }).then(offers => {
    console.log(offers);
  });
}

export const settleDebt = (privkey, accountId, amount) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);
  let debtAsset = new StellarSdk.Asset('STRTMUSD', accountId);

  return server.loadAccount(keypair.publicKey())
  .then(acc => {
    var transaction = new StellarSdk.TransactionBuilder(acc)
      .addOperation(StellarSdk.Operation.payment({
        destination: accountId,
        asset: debtAsset,
        amount: amount
      }))
      .build();
    transaction.sign(keypair);
    return server.submitTransaction(transaction);
  });
}

export const setInflation = (privkey, accountId) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);

  return server.loadAccount(keypair.publicKey())
  .then(acc => {
    var transaction = new StellarSdk.TransactionBuilder(acc)
      .addOperation(StellarSdk.Operation.setOptions({
        inflationDest: accountId
      }))
      .build();
    transaction.sign(keypair);
    return server.submitTransaction(transaction);
  });
}
