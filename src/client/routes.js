/*
  loadData serves as the page's preloading function
  Should return a Promise
*/

import Home from './components/Home/Home';
import Wallet from './components/Wallet/Wallet';
import Key from './components/Key/Key';
import Error from './components/Misc/Error';
import Terms from './components/Terms/Terms';
import Privacy from './components/Privacy/Privacy';

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
  },
  {
    path: '/terms',
    component: Terms
  },
  {
    path: '/privacy',
    component: Privacy
  },
  {
    component: Error
  }
];

export default routes;
