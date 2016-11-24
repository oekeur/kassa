import React from 'react';

import cssModules from 'react-css-modules';
import style from './transaction.css';

const Receipt = ({receipt}) => (
	<ul styleName="receipt">
	{receipt.items.map((item, i) => (
		<li key={i}>
			<span styleName="amount">{item.amount}</span>
			<span styleName="name">{item.name}</span>
			<span styleName="total">{(item.price * item.amount).toFixed(2)}</span>
		</li>
	))}
	</ul>
);

export default cssModules(Receipt, style);