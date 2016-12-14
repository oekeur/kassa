import React from 'react';

import cssModules from 'react-css-modules';
import style from './styles.css';

import Button from '../button';

const Payment = ({onClick, receipt}) => (
	<div styleName="payment">
		{ (!(receipt.user === 'extern')) && 
			<Button
			styleName="viltjes"
			label="Opschrijven"
			icon='fa-won'
			onClick={() => onClick('viltjes')}
		/>}
		{
			(receipt.key || receipt.user === 'extern' || receipt.user === 'dexter') && 
		<Button
			styleName="cash"
			label="Cash"
			icon='fa-money'
			onClick={() => onClick('cash')}
		/>
		}
	</div>
);

export default cssModules(Payment, style);

