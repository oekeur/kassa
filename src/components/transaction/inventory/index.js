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
), style);