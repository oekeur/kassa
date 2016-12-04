import React from 'react'
import cssModules from 'react-css-modules';
import style from './styles.css';
import { connect } from 'react-hz';


import PersonList from '../personlist';

import _ from 'lodash';
import moment from 'moment';
import {Link} from 'react-router';
import members from '../../members.yml';
import Button from '../button';

const Recent = cssModules(({receipts}) => (<ul styleName='recent'>
  {receipts.map(({user, foruser, total, type, timestamp, id}, i) => {
    const recent = moment(timestamp).add(150, 'minutes') > moment();

    return recent ? (
      <li key={i}>
        <Link to={`/transaction/${user}/${id}/`}>
          { type == 'cash'
            ? <i className="fa fa-money" />
            : <i className="fa fa-won" /> }
          <p styleName="user">{_.upperFirst(user)} {foruser && ' -> ' + foruser}</p>
          <p styleName="total">{total}</p>
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




const Home = ({receipts, recent}) => (
  <div styleName='home'>
    <div styleName='menu'>
      <Button icon='settings' />
      <Button icon='person_add' />
    </div>
    <div styleName='main'>
      <Recent receipts={receipts} />
      <Recent receipts={recent} />
      <PersonList
        persons={members}
        styleName='persons'/>
    </div>
  </div>
)

Home.propTypes = {
  // children: React.PropTypes.element.isRequired,
};


export default connect(cssModules(Home, style), {
  subscriptions: {
    receipts: (hz) =>
      hz('receipts')
        .order('timestamp', 'descending')
        .limit(15),
    recent: (hz) =>
      hz('receipts')
        .order('timestamp', 'descending')
        .limit(10),
  },
  mutations: {},
});
