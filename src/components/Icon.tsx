import React from 'react';
import 'styled-components/macro';
import '../styles/icons/weather-icons.min.css';

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

const Icon = (props: IconProps) => {
  const { name, size, ...remainingProps } = props;
  return (
    <span
      className={`wi ${name}`}
      css={`
        font-size: ${iconSizes[size] || props.size};
      `}
      {...remainingProps}
    />
  );
};

export default Icon;
