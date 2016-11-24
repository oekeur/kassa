import React from 'react';

export default ({receipt}) => (
	<h1>Total: {_.sumBy(receipt.items, item => item.amount * item.price).toFixed(2)}</h1>
);