import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import style from './calculator.css';

class Calculator extends Component {
	updateBuffer(num) {
		let {onClick, receipt: {current: {amount = 0}}} = this.props;

		onClick(Number(`${amount}${num}`));
	}

	render() {
		let {receipt: {current}} = this.props;

		return (
			<div styleName="calculator">
				<span styleName="amount">{current.amount}</span>
				<div styleName="numberpad">
				{ [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
					<p key={num} onClick={() => this.updateBuffer(num)}>{num}</p>
				))}
				</div>
			</div>
		)
	}

}

export default cssModules(Calculator, style);