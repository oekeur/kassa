import React from 'react';

import cssModules from 'react-css-modules';
import style from './transaction.css';


const Payment = () => (
	<div styleName="payment">
		<div styleName="viltje">Viltjes</div>
		<div styleName="cash">Cash</div>
	</div>
);

export default cssModules(Payment, style);

