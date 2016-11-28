import React from 'react';

import cssModules from 'react-css-modules';
import style from './styles.css';

import PersonList from '../personlist';
import members from '../../members.yml';

const SelectUser = () => (
	<div styleName="selectuser">
		<PersonList persons={members} />
	</div>
);

export default cssModules(SelectUser, style);

