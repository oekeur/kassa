import React from 'react';
import Main from './components/main/Main';
import Transaction from './components/transaction/Transaction';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Transaction} />
  </Route>
);
