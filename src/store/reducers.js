import { combineReducers } from 'redux';
import { preload } from './actions';

//Reducer for preloading
const dataReducer = (state = {}, action) => {
  switch(action.type) {
    case "PRELOAD_DATA":
      return action.data;
    default: return state;
  }
}

const userReducer = (state = { loggedIn: false, msg: '' }, action) => {
  switch(action.type) {
    case "LOGIN_SUCCESS":
      return Object.assign({}, state, {
        loggedIn: true
      });
    case "LOGIN_ERROR":
      return Object.assign({}, state, {
        loggedIn: false
      });
    case "PRIVKEY_SET":
    return Object.assign({}, state, {
      privkey: action.privkey
    });
    default: return state;
  }
}

//Combines all reducers
const reducer = combineReducers({
  data: dataReducer,
  user: userReducer
});

export default reducer;