import React from 'react';

import cssModules from 'react-css-modules';
import style from './styles.css';

const Receipt = ({receipt, removeItem, onItemClick, ...rest}) => (
	<ul styleName="receipt" {...rest}>
	{receipt.items.map((item, i) => (
		<li key={i}>
			<span onClick={() => onItemClick(i)} styleName="amount">{item.amount}</span>
			<span onClick={() => onItemClick(i)} styleName="name">{item.name}</span>
			<span onClick={() => onItemClick(i)} styleName="total">{(item.price * item.amount).toFixed(2)}</span>
			<icon className="material-icons click" styleName="remove" onClick={() => removeItem(i)}>
				clear
			</icon>
		</li>
	))}
	</ul>
);

export default cssModules(Receipt, style);