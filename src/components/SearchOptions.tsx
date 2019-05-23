import React from 'react';
// import styled from 'react-emotion';
import { FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { RadioGroupProps } from '@material-ui/core/RadioGroup';
import { SearchType } from './WeatherSearch';

export interface SearchOptionsProps {
  onSearchTypeSelect: (value: SearchType) => void;
  selectedOption: string;
}
/*
const StyledSearchByRadioGroup = styled(RadioGroup)`
  && {
    flex-direction: row;
    margin-bottom: 16px;
  }
`; */

const SearchOptions = (props: SearchOptionsProps) => {
  const { selectedOption } = props;

  const handleChange = (e: React.ChangeEvent<RadioGroupProps>) => {
    e.preventDefault();
    props.onSearchTypeSelect(e.target.value as SearchType);
  };
  return (
    <RadioGroup
      aria-label="Select zip, coordinates, or location to search"
      name="searchby"
      onChange={handleChange}
      value={selectedOption}
    >
      <FormControlLabel
        value="city"
        checked={selectedOption === 'city'}
        control={<Radio />}
        label="By City"
      />
      <FormControlLabel
        control={<Radio />}
        checked={selectedOption === 'coords'}
        label="By Latitude/Longitude"
        value="coords"
      />
      <FormControlLabel
        value="zip"
        checked={selectedOption === 'zip'}
        control={<Radio />}
        label="By Zip Code"
      />
    </RadioGroup>
  );
};

export default SearchOptions;
