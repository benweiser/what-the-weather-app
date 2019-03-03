import { PropTypes } from "prop-types";
import React from "react";
import Button from "@material-ui/core/Button";
import { css } from "emotion";
import SearchOptions from "./SearchOptions";
import WeatherSearchInput from "./WeatherSearchInput";

const StyledSearchFormDiv = css`
  display: flex;
`;

class WeatherSearch extends React.Component {
  state = {
    searchMethod: "city",
    value: ""
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onFetchWeather } = this.props;
    if (onFetchWeather) {
      onFetchWeather(this.state);
    }
  };

  onSearchTypeSelect = type => {
    this.setState({ searchMethod: type });
  };

  render() {
    const { className } = this.props;
    const { searchMethod, value } = this.state;
    return (
      <div className={className}>
        <form onSubmit={this.handleSubmit}>
          <SearchOptions
            onSearchTypeSelect={this.onSearchTypeSelect}
            selectedOption={searchMethod}
          />
          <div className={StyledSearchFormDiv}>
            <WeatherSearchInput
              onChange={this.handleChange}
              type={searchMethod}
              value={value}
            />
            <Button
              data-testid="search-button"
              color="primary"
              variant="contained"
              type="submit"
            >
              Get Weather
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

WeatherSearch.propTypes = {
  onFetchWeather: PropTypes.func.isRequired
};

export default WeatherSearch;
