import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import style from './styles.css';
import _ from 'lodash';

const Calculator = ({amount, updateAmount, clearAmount}) => (
	<div styleName="calculator">
		<span styleName="amount">
			<p>{amount}</p>
			{amount && <icon className="material-icons click" styleName="remove" onClick={() => clearAmount()}>
				clear
			</icon>}

		</span>
		<div styleName="numberpad">
		{ _.concat(_.range(1, 10), 0).map(num => (
			<p
				key={num}
				onClick={() => updateAmount(Number(`${amount || 0}${num}`))}
				className="click"
			>{num}</p>
		))}
		</div>
	</div>
)

export default cssModules(Calculator, style);