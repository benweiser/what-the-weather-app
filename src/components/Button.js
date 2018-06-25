import React from 'react';
import './styles/Button.css';

const Button = props => (
  <button className="Button" {...props}>
    {props.children}
  </button>
);

export default Button;
