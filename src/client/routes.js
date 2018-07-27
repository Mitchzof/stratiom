/*
  loadData serves as the page's preloading function
  Should return a Promise
*/

import Home from './components/Home/Home';
import Wallet from './components/Wallet/Wallet';
import Key from './components/Key/Key';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/wallet',
    component: Wallet
  },
  {
    path: '/key',
    component: Key
  }
];

export default routes;
