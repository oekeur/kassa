import React from 'react'
import cssModules from 'react-css-modules';
import style from './styles.css';
import { connect } from 'react-hz';

import SelectUser from '../selectuser';

import PersonList from '../personlist';

import _ from 'lodash';
import moment from 'moment';
import { Link, browserHistory } from 'react-router';
import members from '../../members.yml';
import Button from '../button';

const Recent = cssModules(({receipts}) => (<ul styleName='recent'>
  {receipts.map(({user, foruser, total, type, timestamp, id}, i) => {
    const recent = moment(timestamp).add(150, 'minutes') > moment();

    return recent ? (
      <li key={i}>
          { type == 'cash'
            ? <i className="fa fa-money" />
            : <i className="fa fa-won" /> }
          <p styleName="user">{_.upperFirst(user)} {foruser && ' -> ' + foruser}</p>
          <p styleName="total">{total}</p>
          <Link to={`/transaction/${user}/${id}/`}>
            <icon className="material-icons">mode_edit</icon>
          </Link>
      </li>
    ) : (
      <li key={i}>
        { type == 'cash'
          ? <i className="fa fa-money" />
          : <i className="fa fa-won" /> }
        <p styleName="user">{_.upperFirst(user)} {foruser && ' -> ' + foruser}</p>
        <p styleName="total">{total}</p>
      </li>
    );
  })}
  </ul>),
  style
)



class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }
  getRecentMembers() {
    return _.filter(_.map(
      _.groupBy(this.props.receipts, 'user'),
      (value, key) =>
        _.find(members, member => member.nick.toLowerCase() === key)
    ));
  }
  render() {
    const { receipts } = this.props;
    const { selectuser } = this.state;
    return (
      <div styleName='home'>
        <div styleName='menu'>
          <Button icon='settings' />
          <Button icon='fa-money' label='Extern' onClick={() => browserHistory.push('/transaction/extern/')}/>

        </div>
        <div styleName='main'>
          <Recent receipts={receipts} />
          <div>
          </div>
          <div styleName='persons'>
            <PersonList
              persons={this.getRecentMembers()}
              styleName='persons'/>
            <Button
              icon='person_add'
              label='Ander persoon'
              styleName='button'
              onClick={() => this.setState({
                selectuser: true
              })}
            />
          </div>
        </div>

        {selectuser &&
          <SelectUser
            onCancel={() => this.setState({selectuser: false})}
            onSelect={(user) => {
              this.setState({selectuser: false});
              browserHistory.push(`/transaction/${user.toLowerCase()}/`);
            }}
          />
        }
      </div>
    )
  }
}

export default connect(cssModules(Home, style), {
  subscriptions: {
    receipts: (hz) =>
      hz('receipts')
        .order('timestamp', 'descending')
        .limit(15)
  },
  mutations: {},
});
