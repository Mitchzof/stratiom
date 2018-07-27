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
