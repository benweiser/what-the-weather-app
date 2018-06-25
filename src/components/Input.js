import React from 'react';
import { PropTypes } from 'prop-types';
import './styles/Input.css';

const Input = props => (
  <input
    className="Input"
    {...props}
  />
);

Input.propTypes = {
  "aria-label": PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default Input;
