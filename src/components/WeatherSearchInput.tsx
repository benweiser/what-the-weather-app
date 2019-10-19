import React from 'react';
import TextField from '@material-ui/core/TextField';
import { css } from 'emotion';
import { SearchType } from './WeatherSearch';

export interface WeatherSearchInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type: SearchType;
  value: string;
}

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

const WeatherSearchInput = ({
  onChange,
  onKeyPress,
  onFocus,
  type,
  value
}: WeatherSearchInputProps) => {
  const inputLabel = inputLabelsByType[type];
  const { label } = inputLabel;
  return (
    <TextField
      data-testid={`WeatherSearchInput-${type}`}
      placeholder={label}
      className={StyledTextField}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onFocus={onFocus}
      label={label}
      value={value}
      aria-label={label}
    />
  );
};

export default WeatherSearchInput;
