import React from "react";
import { PropTypes } from "prop-types";
import "../styles/icons/weather-icons.min.css";
import styled from "react-emotion";

const iconSizes = {
  sm: "24px",
  md: "32px",
  lg: "48px",
  xl: "64px"
};

const StyledIcon = styled("span")`
  font-size: ${props => iconSizes[props.size] || props.size};
`;

const Icon = ({ name, ...props }) => {
  return <StyledIcon className={`wi ${name}`} {...props} />;
};

export default Icon;

StyledIcon.propTypes = {
  size: PropTypes.string.isRequired
};
