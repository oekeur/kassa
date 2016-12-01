import React from 'react'
import cssModules from 'react-css-modules';
import style from './styles.css';
import { connect } from 'react-hz';


import PersonList from '../personlist';

import _ from 'lodash';
import moment from 'moment';
import {Link} from 'react-router';
import members from '../../members.yml';

const Home = ({receipts}) => (
	<div styleName='home'>
		<ul styleName='recent'>
		{receipts.map(({user, total, type, timestamp, id}, i) => {
			const recent = moment(timestamp).add(150, 'minutes') > moment();

			if (recent) {
				return (
					<li key={i}>
						<Link to={`/transaction/${user}/${id}/`}>
							{ type == 'cash'
								? <i className="fa fa-money" />
								: <i className="fa fa-won" /> }
							<p styleName="user">{_.upperFirst(user)}</p>
							<p styleName="total">{total}</p>
						  	<icon className="material-icons">mode_edit</icon>
					  	</Link>
					</li>
				);
			}
			return (
				<li key={i}>
					{ type == 'cash'
						? <i className="fa fa-money" />
						: <i className="fa fa-won" /> }
					<p styleName="user">{_.upperFirst(user)}</p>
					<p styleName="total">{total}</p>
				</li>
			);
		})}
		</ul>
		<PersonList
			persons={members}
			make/>
	</div>
)

Home.propTypes = {
  // children: React.PropTypes.element.isRequired,
};


export default connect(cssModules(Home, style), {
  subscriptions: {
    receipts: (hz) => hz('receipts').order('timestamp', 'descending').limit(20),
  },
  mutations: {},
});
