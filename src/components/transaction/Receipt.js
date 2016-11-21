import React from 'react';

export default () => (
	<ul>
	{
		[{price: 2.25, number: 2, name: "Bier"},
		{price: 2.8, number: 2, name: "HJ Fles"},
		{price: 16, number: 2, name: "Wijn", }
		].map((item, i) => (
			<li key={i}>{item.number} x {item.name} = {item.price}</li>
		))
	}
	</ul>
);