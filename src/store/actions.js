/*
  Redux Actions
*/

//Preloading action for SSR
export const preload = (data) => ({
  type: "PRELOAD_DATA",
  data: data
});

//Login actions
export const loginSuccess = () => ({
  type: "LOGIN_SUCCESS"
});

export const loginError = () => ({
  type: "LOGIN_ERROR"
});

export const setPrivkey = (privkey) => ({
  type: "PRIVKEY_SET",
  privkey: privkey
});

export const setPubkey = (pubkey) => ({
  type: "PUBKEY_SET",
  pubkey: pubkey
});

export const hasLoaded = (loaded) => ({
  type: "ACCOUNT_LOADED",
  loaded: loaded
});

export const loadAccount = (acc) => {
  return ({
    type: "LOAD_ACCOUNT",
    account: acc
  });
}

export const setTrustlines = (trustlines) => {
  return ({
    type: "SET_TRUSTLINES",
    trustlines: trustlines
  });
}
