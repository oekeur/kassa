import React from 'react';

import cssModules from 'react-css-modules';
import style from './styles.css';
import _ from 'lodash';

const UserInfo = ({user}) => (
	<div styleName='userinfo'>
		<icon className="material-icons">
			person
		</icon>
		<h2>{_.upperFirst(user)}</h2>
	</div>
);

export default cssModules(UserInfo, style);
