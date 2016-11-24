import React from 'react';
import Main from './components/main/Main';
import Transaction from './components/transaction';
import Home from './components/home';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Transaction} />
    <Route path="/transaction" component={Transaction} />
  </Route>
);

