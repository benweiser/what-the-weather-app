import React from 'react';
import '../styles/icons/weather-icons.min.css';
import styled from 'react-emotion';

export interface IconProps {
  name: string;
  size: string;
}

const iconSizes: { [key: string]: string } = {
  sm: '24px',
  md: '32px',
  lg: '48px',
  xl: '64px'
};

const StyledIcon = styled('span')<{ size: string }>`
  font-size: ${props => iconSizes[props.size] || props.size};
`;

const Icon = ({ name, ...props }: IconProps) => {
  return <StyledIcon className={`wi ${name}`} {...props} />;
};

export default Icon;
