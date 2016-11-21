import React from 'react';

import './Calculator.css';


export default () => (
	<div className="Calculator">
		{ [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(
			num => (
				<p key={num}>{num}</p>
			)
		)}
	</div>
);