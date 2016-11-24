import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import style from './styles.css';

const Calculator = ({receipt: {current}, updateAmount, clearAmount}) => (
	<div styleName="calculator">
		<span styleName="amount">
			<p>{current.amount}</p>
			<icon className="material-icons click" styleName="remove" onClick={() => clearAmount()}>
				clear
			</icon>

		</span>
		<div styleName="numberpad">
		{ [1, 4, 7, 2, 5, 8, 3, 6, 9, 0].map(num => (
			<p
				key={num}
				onClick={() => updateAmount(Number(`${current.amount || 0}${num}`))}
				className="click"
			>{num}</p>
		))}
		</div>
	</div>
)

export default cssModules(Calculator, style);