
import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import style from './transaction.css';
import { connect } from 'react-hz';

import UserInfo from './UserInfo';
import Total from './Total'; 
import Receipt from './Receipt';
import Calculator from './Calculator'; 
import Payment from './Payment';

import InventoryData from '../../inventory.yml';
import Inventory from './inventory';

class Transaction extends Component {
  render() {
    return (
      <div styleName="transaction">
        <div styleName="side">
          <UserInfo />
          <Total />
          <Receipt />
          <Calculator />
          <Payment />
        </div>
        <div styleName="inventory">
          <Inventory data={InventoryData} />
        </div>
      </div>
    );
  }
}

export default connect(cssModules(Transaction, style), {
  subscriptions: {
    todos: (hz) => hz('todos').order('timestamp', 'descending').limit(10000),
  },
  mutations: {
    addTodo: (hz) => (todo, finished, timestamp) => hz('todos').store({
      todo, finished, timestamp,
    }),
  },
});
