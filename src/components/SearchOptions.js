import React from "react";
import styled from "react-emotion";
import { PropTypes } from "prop-types";
import { FormControlLabel, RadioGroup, Radio } from "@material-ui/core";

const StyledSearchByRadioGroup = styled(RadioGroup)`
  && {
    flex-direction: row;
  }
`;

class SearchOptions extends React.PureComponent {
  handleChange = e => {
    e.preventDefault();
    this.props.onSearchTypeSelect(e.target.value);
  };

  render() {
    const { selectedOption } = this.props;

    return (
      <StyledSearchByRadioGroup
        aria-label="Select zip, coordinates, or location to search"
        name="searchby"
        onChange={this.handleChange}
        value={selectedOption}
      >
        <FormControlLabel
          value="city"
          checked={selectedOption === "city"}
          control={<Radio />}
          label="By City"
        />
        <FormControlLabel
          control={<Radio />}
          checked={selectedOption === "coords"}
          label="By Latitude/Longitude"
          value="coords"
        />
        <FormControlLabel
          value="zip"
          checked={selectedOption === "zip"}
          control={<Radio />}
          label="By Zip Code"
        />
      </StyledSearchByRadioGroup>
    );
  }
}

SearchOptions.propTypes = {
  onSearchTypeSelect: PropTypes.func.isRequired
};

export default SearchOptions;
