import React from 'react';
import cssModules from 'react-css-modules';
import style from './styles.css';

export default cssModules(({receipt: {total}}) => (
	<div styleName='total'>{total && `€ ${total}`}</div>
), style);