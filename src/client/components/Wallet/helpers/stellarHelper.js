const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org/');

export const loadAccount = (pubkey) => {
  return server.loadAccount(pubkey);
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
  }).then((res) => {
    createOffers(privkey, debtAsset);
  })
}

const createOffers = (privkey, buying) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);
  let selling = new StellarSdk.Asset('STRTMUSD', keypair.publicKey());

  server.loadAccount(keypair.publicKey())
  .then((acc) => {
    server.offers('accounts', acc.account_id).call()
    .then(offers => {
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
            amount: '1000000',
            price: 1
          }))
          .build();
        transaction.sign(keypair);
        server.submitTransaction(transaction);
      }
    })
  })
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

export const issueAssets = (privkey, accountId, amount) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);
  let debtAsset = new StellarSdk.Asset('STRTMUSD', keypair.publicKey());

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

export const attemptPathPayment = (privkey, accountId, amount) => {
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
          return paths.records[0];
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
    return payWithPath(
      privkey,
      paths,
      accountId,
      amount
    );
  });
}

const payWithPath = (privkey, paths, accountId, amount) => {
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
        .build();
      transaction.sign(keypair);
      return server.submitTransaction(transaction);
    });
  }
}
