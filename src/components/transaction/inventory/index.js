import React from 'react';

import cssModules from 'react-css-modules';
import classnames from 'classnames';
import _ from 'lodash';

import style from './inventory.css';

export default cssModules(({data, onClick}) => (
	<div styleName="inventory">
	{ data.map((group, i) => (
		<div key={i} styleName="group">
			<h3>{group.name}</h3>
			<ul styleName={classnames("items")}>
			{ _.sortBy(group.items, 'name').map((item, i) => (
				<li
					key={i}
					styleName={classnames({icon: item.icon})}
					onClick={() => onClick({...item})}
				>
					{item.icon && (<icon className='material-icons'>{item.icon}</icon>)}
					<p styleName="name">{item.name}</p>
					<p styleName="price">
						{_.isNumber(item.price) ? item.price.toFixed(2) : item.price}
					</p>
				</li>
			))}
			</ul>
		</div>
	))}
	</div>
), style);