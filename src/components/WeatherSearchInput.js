import React from 'react';
import TextField from '@material-ui/core/TextField';
import { css } from 'emotion';

const StyledTextField = css`
  flex: 1;
  width: 100%;
`;

const inputLabelsByType = {
  city: {
    label: 'Enter a city name'
  },
  coords: {
    label: 'Enter latitude and longitude'
  },
  zip: {
    label: 'Enter zip code'
  }
};

const WeatherSearchInput = ({ onChange, type, value }) => {
  const inputLabel = inputLabelsByType[type];
  const { label } = inputLabel;
  return (
    <TextField
      data-testid={`WeatherSearchInput-${type}`}
      placeholder={label}
      className={StyledTextField}
      onChange={onChange}
      label={label}
      value={value}
      aria-label={label}
    />
  );
};

export default WeatherSearchInput;
