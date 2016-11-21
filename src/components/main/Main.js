import React from 'react';
import cssModules from 'react-css-modules';
import style from './styles.css';

const Main = (props) => (
  <div styleName="container">
    {props.children}
  </div>
);

Main.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default cssModules(Main, style);
