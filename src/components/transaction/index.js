
import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import {Link} from 'react-router';
import style from './styles.css';
import { connect } from 'react-hz';
import classnames from 'classnames';

import UserInfo from './UserInfo';
import Total from './Total'; 
import Receipt from './Receipt';
import Calculator from './Calculator'; 
import Payment from './Payment';
import Button from '../button';
import SelectUser from '../selectuser';

import InventoryData from '../../inventory.yml';
import Inventory from './inventory';


class Transaction extends Component {
  constructor(props) {
    super(props);

    const {routeParams: {userid}} = props

    this.state = {
      receipt: {
        user: userid,
        selectuser: false,
        items: [],
      },
      calculator: undefined
    }
  }

  componentWillReceiveProps({receipt}) {
    // Update state with data received from db
    this.setState({
      receipt
    })
  }
  updateTotal(receipt) {
    return {
      ...receipt,
      total: _.sumBy(receipt.items, item => item.amount * item.price).toFixed(2)
    }
  }
  addItem(item) {
    const { receipt, calculator } = this.state;

    const _item = {
      ...item,
      amount: calculator || 1
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
      receipt: this.updateTotal({
        ...receipt,
        items
      }),
      calculator: undefined
    })
  }
  updateItemAmount(index) {
    const { calculator, receipt } = this.state;

    const item = receipt.items[index]

    if (!calculator) return;

    this.setState({
      calculator: undefined,
      receipt: this.updateTotal({
        ...receipt,
        items: _.concat(
          _.slice(receipt.items, 0, index), {
            ...item,
            amount: calculator
          },
          _.slice(receipt.items, index + 1)
        )
      })
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
    const { receipt, selectuser, calculator } = this.state;
    const { addReceipt, router, children, params } = this.props;

    return (
      <div styleName="transaction">
        <div styleName="menu">
          <UserInfo
            styleName="changeperson"
            receipt={receipt}
            onClick={() => this.setState({
              selectuser: true
            })}
          />
        </div>
        <div styleName="content">
          <div styleName="side">
            <Calculator
              amount={calculator}
              receipt={receipt}
              clearAmount={() =>
                this.setState({
                  calculator: undefined
                })}
              updateAmount={num => 
                this.setState({
                  calculator: num
                })
              }/>
            <Receipt
              styleName={classnames({hasamount:calculator})}
              receipt={receipt}
              removeItem={(index) => this.removeItem(index)}
              onItemClick={(index) => this.updateItemAmount(index)}
            />
            <div className={classnames({active: calculator})} styleName='totalgroup'>
              <Total receipt={receipt}/>
              <Payment receipt={receipt} onClick={(type) => {
                addReceipt({
                  ...receipt,
                  total: _.sumBy(receipt.items, item => item.amount * item.price).toFixed(2),
                  type: type,
                  timestamp: new Date()
                });
                router.push({pathname: '/'})
              }} />
            </div>
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
        {selectuser &&
          <SelectUser
            title="Maak het bonnetje voor iemand anders"
            onCancel={() => this.setState({selectuser: false})}
            onSelect={(user) => this.setState({selectuser: false, receipt:{...receipt, foruser: user}})}
          />
        }
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
