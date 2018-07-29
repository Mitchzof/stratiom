const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon.stellar.org/');

export const loadAccount = (pubkey) => {
  return server.loadAccount(pubkey);
}
