import React from "react";
import styled from "react-emotion";
import { PropTypes } from "prop-types";
import { FormControlLabel, RadioGroup, Radio } from "@material-ui/core";

const StyledSearchByRadioGroup = styled(RadioGroup)`
  flex-direction: row;
`;

class SearchOptions extends React.PureComponent {
  state = {
    value: "city"
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ value: e.target.value }, () => {
      console.log("SearchOptions this state value", this.state.value);
      return this.props.onSearchTypeSelect(this.state.value);
    });

    /*     this.setState((prevState, props) => {
      console.log("prev state", prevState);
      console.log("props", props);
    }); */

    //   console.log("this is the radio event target value", e.target.value);
    //   console.log("this is the radio state value", this.state.value);
  };

  render() {
    return (
      <StyledSearchByRadioGroup
        aria-label="Select zip, coordinates, or location to search"
        name="searchby"
        onChange={this.handleChange}
        value={this.state.value}
      >
        <FormControlLabel value="city" control={<Radio />} label="By City" />
        <FormControlLabel
          control={<Radio />}
          label="By Latitude/Longitude"
          value="coords"
        />
        <FormControlLabel value="zip" control={<Radio />} label="By Zip Code" />
      </StyledSearchByRadioGroup>
    );
  }
}

SearchOptions.propTypes = {
  onSearchTypeSelect: PropTypes.func.isRequired
};

export default SearchOptions;
