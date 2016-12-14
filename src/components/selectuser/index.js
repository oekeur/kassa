import React from 'react';

import cssModules from 'react-css-modules';
import style from './styles.css';

import PersonList from '../personlist';
import members from '../../members.yml';
import Button from '../button'; 

const SelectUser = ({title, onCancel, onSelect}) => (
	<div styleName="selectuser">
    {title && <h1>{title}</h1>}
    <div styleName='main'>
      <div styleName="side">
        <Button styleName='cancel' icon='keyboard_backspace' label='Annuleren' onClick={onCancel} />
      </div>
      <PersonList persons={members} onSelect={onSelect}/>
    </div>
	</div>
);

export default cssModules(SelectUser, style);

