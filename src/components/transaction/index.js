
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
  constructor(props) {
    super(props);

    this.state = {
      receipt: {
        items: [],
        current: {}
      }
    }
  }
  addItem(item) {
    const { receipt } = this.state;

    const _item = {
      ...item,
      amount: _.get(receipt, 'current.amount', 1)
    }

    const items = _.reduce(
      _.groupBy(receipt.items.concat(_item), 'name'),
      (result, group) => 
        result.concat(
          _.merge({}, ...group, {
            amount: _.sumBy(group, i => _.get(i, 'amount', 1))
          }),
        ),
      []
    )
    console.log('Added', {
      item: item, 
      _item: _item, 
      items: items,
      receipt: receipt
    })
    this.setState({
      receipt: {
        items,
        current: {}
      }
    })
  }
  render() {
    const { receipt } = this.state;
    return (
      <div styleName="transaction">
        <div styleName="side">
          <UserInfo />
          <Calculator
            receipt={receipt}
            onClick={
              num => this.setState({
                receipt: {
                  ...receipt,
                  current: {
                    amount: num
                  }
                }
              })
            }/>
          <Receipt receipt={receipt}/>
          <Total receipt={receipt}/>
          <Payment />
        </div>
        <div styleName="inventory">
          <Inventory
            data={InventoryData}
            onClick={item => this.addItem(item)}
          />
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
