const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server((TESTNET) ? 'https://horizon-testnet.stellar.org/' : 'https://horizon.stellar.org/');

/*
  These are helper functions for use with private keys (not Ledger).
  Each exported function returns a promise for async handling in React
  components.

  Below are the parameter definitions as used in these helper functions

  If a function is not exported, then it is simply a helper for one of these helper functions.

  (Params)
  pubkey: User's public key
  privkey: User's private key
  accountId: Target account address
  price: Price of 1 unit of selling asset in terms of buying asset
  amount: Amount of asset to be sent or exchanged
  offerId: Offer Id for offer modification
  issuer: Issuer of target asset (similar to/synonymous with accountId)
  note: Text entry for memo type text
*/

export const loadAccount = (pubkey) => {
  return server.loadAccount(pubkey);
}

export const isValidKey = (pubkey) => {
  return StellarSdk.StrKey.isValidEd25519PublicKey(pubkey);
}

export const loadXLMOffer = (accountId) => {
  return server.loadAccount(accountId)
  .then((acc) => {
    return server.offers('accounts', acc.account_id).call()
  }).then(offers => {
    let xlmOffer = null
    offers.records.forEach(offer => {
      if (offer.buying.asset_issuer == accountId && offer.selling.asset_type == 'native') {
        xlmOffer = offer;
        console.log(offer);
      }
    });
    return xlmOffer;
  });
}

export const exchangeForXLM = (privkey, price, amount, accountId) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);
  let selling = new StellarSdk.Asset('STRTMUSD', accountId);

  return server.loadAccount(keypair.publicKey())
  .then((acc) => {
    var transaction = new StellarSdk.TransactionBuilder(acc)
      .addOperation(StellarSdk.Operation.manageOffer({
        selling: selling,
        buying: StellarSdk.Asset.native(),
        amount: amount,
        price: price
      }))
      .build();
    transaction.sign(keypair);
    return server.submitTransaction(transaction);
  });
}

export const linkXLM = (privkey, price, amount, offerId=null) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);
  let buying = new StellarSdk.Asset('STRTMUSD', keypair.publicKey());
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
    if (offerId) {
      var transaction = new StellarSdk.TransactionBuilder(acc)
        .addOperation(StellarSdk.Operation.manageOffer({
          selling: StellarSdk.Asset.native(),
          buying: buying,
          amount: amount,
          price: price,
          offerId: offerId
        }))
        .build();
      transaction.sign(keypair);
      return server.submitTransaction(transaction);
    } else if (canCreate) {
      var transaction = new StellarSdk.TransactionBuilder(acc)
        .addOperation(StellarSdk.Operation.manageOffer({
          selling: StellarSdk.Asset.native(),
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

export const deleteOffer = (privkey, offerId, issuer) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);
  let selling = new StellarSdk.Asset('STRTMUSD', keypair.publicKey());
  let buying = new StellarSdk.Asset('STRTMUSD', issuer);

  return server.loadAccount(keypair.publicKey())
  .then((acc) => {
    var transaction = new StellarSdk.TransactionBuilder(acc)
      .addOperation(StellarSdk.Operation.manageOffer({
        selling: selling,
        buying: buying,
        amount: '0',
        price: 1,
        offerId: offerId
      }))
      .build();
    transaction.sign(keypair);
    return server.submitTransaction(transaction);
  });
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

export const setFlags = (privkey) => {
  let keypair = StellarSdk.Keypair.fromSecret(privkey);

  return server.loadAccount(keypair.publicKey())
  .then((acc) => {
    var transaction = new StellarSdk.TransactionBuilder(acc)
      .addOperation(StellarSdk.Operation.setOptions({
        setFlags: StellarSdk.AuthRevocableFlag | StellarSdk.AuthRequiredFlag
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
            if (paths.records[i].source_asset_code == 'STRTMUSD'  && paths.records[i].source_asset_issuer == keypair.publicKey()) {
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
    console.log(paths);
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
