import React from 'react';

import cssModules from 'react-css-modules';
import style from './styles.css';

import Button from '../button';

const Payment = ({onClick}) => (
	<div styleName="payment">
		<Button
			styleName="viltjes"
			label="Viltjes"
			icon='fa-won'
			onClick={() => onClick('viltjes')}
		/>
		<Button
			styleName="cash"
			label="Cash"
			icon='fa-money'
			onClick={() => onClick('cash')}
		/>
	</div>
);

export default cssModules(Payment, style);

