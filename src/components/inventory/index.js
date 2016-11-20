import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import './inventory.css';

export default ({data}) => (
	<div className="Inventory">
	{ data.map((group, i) => (
		<div key={i} className="group">
			<h3>{group.name}</h3>
			<ul className={classnames("items")}>
			{ group.items.map((item, i) => (
				<li key={i} className={classnames({icon: item.icon})}>
					{item.icon && (<icon className={`flaticon-${item.icon}`} />)}
					<p className="name">{item.name}</p>
					<p className="price">{item.price}</p>
				</li>
			))}
			</ul>
		</div>
	))}
	</div>
)