import React from 'react';

import cssModules from 'react-css-modules';
import style from './transaction.css';

const UserInfo = () => (
	<div styleName='userinfo'>
		<icon className="material-icons">
			person
		</icon>
		<h2>Dexter</h2>
	</div>
);

export default cssModules(UserInfo, style);
