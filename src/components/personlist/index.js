import React from 'react';
import {Link} from 'react-router';
import cssModules from 'react-css-modules';
import style from './styles.css';


const PersonList = ({persons}) => (
	<ul styleName='persons'>
	{_.sortBy(persons, 'nick').map((person, i) => (
		<li key={i}>
			<Link to={`/transaction/${person.nick.toLowerCase()}/`}>
				{person.nick}
			</Link>
		</li>
	))}
	</ul>
);

export default cssModules(PersonList, style);


