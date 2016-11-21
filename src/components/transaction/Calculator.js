import React from 'react';
import { connect } from 'react-hz';
import cssModules from 'react-css-modules';
import style from './calculator.css';


export default connect(
	cssModules(() => (
		<div styleName="calculator">
			{ [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(
				num => (
					<p key={num}>{num}</p>
				)
			)}
		</div>
	), style
), {});