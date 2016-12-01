import React from 'react';

import cssModules from 'react-css-modules';
import classnames from 'classnames';
import _ from 'lodash';

import style from './styles.css';

export default cssModules(({receipt, data, onClick}) => (
	<div styleName="inventory">
	{ data.map((group, i) => (
		<div key={i} styleName="group">
			<h3>{group.name}</h3>
			<ul styleName={classnames("items")}>
			{ group.items.sort((a, b) => a.name.localeCompare(b.name, 'nl')).map((item, i) => (
				<li
					key={i}
					className={classnames("click", {
						used: _.some(receipt.items, ['name', item.name])
					})}
					styleName={classnames({
						icon: item.icon
					})}
					onClick={() => onClick({...item})}
				>
					{item.icon && (<icon className='material-icons'>{item.icon}</icon>)}
					<p styleName="name">{item.name}</p>
					<p styleName="price">
						{_.isNumber(item.price) ? item.price.toFixed(2) : item.price}
					</p>
					{_.some(receipt.items, ['name', item.name]) && 
						<span styleName='used'>{_.find(receipt.items, ['name', item.name]).amount}</span>
					}
				</li>
			))}
			</ul>
		</div>
	))}
	</div>
), style);