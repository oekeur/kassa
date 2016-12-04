import React from 'react';
import {Link} from 'react-router';
import cssModules from 'react-css-modules';
import style from './styles.css';
import Button from '../button';


const PersonList = ({persons, onSelect, ...rest}) => (
	<ul styleName='persons' {...rest}>
	{_.sortBy(persons, 'nick').map((person, i) => (
		<li key={i}>
      {onSelect ? (
        <Button styleName='button' label={person.nick} onClick={() => onSelect(person.nick)} />
      ) : (
        <Link to={`/transaction/${person.nick.toLowerCase()}/`}>
          {person.nick}
        </Link>
      )}
		</li>
	))}
	</ul>
);

export default cssModules(PersonList, style);


