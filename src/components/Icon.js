import React from "react";
import "../styles/icons/weather-icons.min.css";
import styled, { css } from "react-emotion";

const iconSizes = {
  sm: "24px",
  md: "32px",
  lg: "48px",
  xl: "64px"
};

const StyledIcon = styled("span")`
  font-size: ${props => iconSizes[props.size] || props.size};
`;

const Icon = props => {
  return <StyledIcon className={`wi ${props.name}`} {...props} />;
};

export default Icon;
