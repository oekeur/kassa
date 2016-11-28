import React from 'react';

import cssModules from 'react-css-modules';
import style from './styles.css';
import {Link} from 'react-router';


const Button = ({icon, label, link, ...props}) => link ? (
	<Link to={link} styleName="button" {...props}>
		{icon && (
			_.startsWith(icon, 'fa-') && <i className={`fa ${icon}`} />
			|| <icon className='material-icons'>{icon}</icon>
		)}
		<label>{label}</label>
	</Link>
) : (
	<div className="button" styleName="button" {...props}>
		{icon && (
			_.startsWith(icon, 'fa-') && <i className={`fa ${icon}`} />
			|| <icon className='material-icons'>{icon}</icon>
		)}
		<label>{label}</label>
	</div>
);

export default cssModules(Button, style);

