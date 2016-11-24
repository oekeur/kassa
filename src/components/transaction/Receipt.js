import React from 'react';

import cssModules from 'react-css-modules';
import style from './styles.css';

const Receipt = ({receipt, removeItem}) => (
	<ul styleName="receipt">
	{receipt.items.map((item, i) => (
		<li key={i}>
			<span styleName="amount">{item.amount}</span>
			<span styleName="name">{item.name}</span>
			<span styleName="total">{(item.price * item.amount).toFixed(2)}</span>
			<icon className="material-icons click" styleName="remove" onClick={() => removeItem(i)}>
				clear
			</icon>
		</li>
	))}
	</ul>
);

export default cssModules(Receipt, style);