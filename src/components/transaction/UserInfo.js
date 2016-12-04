import React from 'react';

import cssModules from 'react-css-modules';
import style from './styles.css';
import _ from 'lodash';

import Button from '../button';

const UserInfo = ({receipt:{user, foruser}}) => (
  <Button
    styleName='userinfo'
    icon='person'
    label={`${_.upperFirst(user)}${foruser ? ` -> ${foruser})` : ''}`}
  />
);

export default cssModules(UserInfo, style);
