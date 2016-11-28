
import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import {Link} from 'react-router';
import style from './styles.css';
import { connect } from 'react-hz';

import UserInfo from './UserInfo';
import Total from './Total'; 
import Receipt from './Receipt';
import Calculator from './Calculator'; 
import Payment from './Payment';
import Button from '../button';

import InventoryData from '../../inventory.yml';
import Inventory from './inventory';


class Transaction extends Component {
  constructor(props) {
    super(props);

    const {routeParams: {userid}} = props

    this.state = {
      receipt: {
        user: userid,
        items: [],
        current: {}
      }
    }
  }

  componentWillReceiveProps({receipt}) {
    // Update state with data received from db
    this.setState({
      receipt
    })
  }

  addItem(item) {
    const { receipt } = this.state;

    const _item = {
      ...item,
      amount: _.get(receipt, 'current.amount', 1)
    }

    const items = _.reduce(
      _.groupBy([_item].concat(receipt.items), 'name'),
      (result, group) => 
        result.concat(
          _.merge({}, ...group, {
            amount: _.sumBy(group, i => _.get(i, 'amount', 1))
          }),
        ),
      []
    )
    this.setState({
      receipt: {
        ...receipt,
        items,
        total: _.sumBy(items, item => item.amount * item.price).toFixed(2),
        current: {}
      }
    })
  }
  removeItem(index) {
    const { receipt } = this.state;
    const items = _.concat(_.slice(receipt.items, 0, index), _.slice(receipt.items, index + 1))
    const total = _.sumBy(items, item => item.amount * item.price).toFixed(2);
    this.setState({
      receipt: {
        ...receipt,
        total,
        items
      }
    })
  }
  render() {
    const { receipt } = this.state;
    const { routeParams, addReceipt, router } = this.props;

    return (
      <div styleName="transaction">
        <div styleName="menu">
          <UserInfo user={routeParams.userid}/>
          <Button
            styleName="changeperson"
            label="Schrijf op iemand"
            icon='keyboard_return'
            link={`${router.location.pathname}onuser`}
          />
        </div>
        <div styleName="content">
          <div styleName="side">
            <Calculator
              receipt={receipt}
              clearAmount={() =>
                this.setState({
                  receipt: {
                    ...receipt,
                    current: {}
                  }
                })}
              updateAmount={num => 
                this.setState({
                  receipt: {
                    ...receipt,
                    current: {
                      amount: num
                    }
                  }
                })
              }/>
            <Receipt receipt={receipt} removeItem={(index) => this.removeItem(index)}/>
            <Total receipt={receipt}/>
            <Payment onClick={(type) => {
              addReceipt({
                ...receipt,
                total: _.sumBy(receipt.items, item => item.amount * item.price).toFixed(2),
                type: type,
                timestamp: new Date()
              });
              router.push({pathname: '/'})
            }} />
            <Button styleName="cancel" label="Annuleren" icon='keyboard_backspace' link='/'/>
          </div>

          <div styleName="inventory">
            <Inventory
              receipt={receipt}
              data={InventoryData}
              onClick={item => this.addItem(item)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(cssModules(Transaction, style), {
  subscriptions: {
    receipt: (hz, {routeParams: {transactionid}}) =>
      hz('receipts').find({id: transactionid})
  },
  mutations: {
    addReceipt: (hz) => (receipt) => hz('receipts').store(receipt)
  },
});
