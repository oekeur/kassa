import React from 'react';
import Main from './components/main/Main';
import Transaction from './components/transaction';
import Home from './components/home';
import SelectUser from './components/selectuser';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Home} />
    <Route path="transaction/:userid/(:transactionid/)" component={Transaction} />
  </Route>
);

