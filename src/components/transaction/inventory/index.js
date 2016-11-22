import React from 'react';

import cssModules from 'react-css-modules';
import classnames from 'classnames';
import _ from 'lodash';

import style from './inventory.css';

export default cssModules(({data}) => (
	<div styleName="inventory">
	{ data.map((group, i) => (
		<div key={i} styleName="group">
			<h3>{group.name}</h3>
			<ul styleName={classnames("items")}>
			{ group.items.map((item, i) => (
				<li key={i} styleName={classnames({icon: item.icon})}>
					{item.icon && (<icon className='material-icons'>{item.icon}</icon>)}
					<p styleName="name">{item.name}</p>
					<p styleName="price">{item.price}</p>
				</li>
			))}
			</ul>
		</div>
	))}
	</div>
), style);