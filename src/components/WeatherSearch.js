import { PropTypes } from "prop-types";
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { css } from "emotion";
import SearchOptions from "./SearchOptions";

const StyledTextField = css`
  width: 380px;
`;

class WeatherSearch extends React.PureComponent {
  state = {
    searchMethod: "city",
    zipCode: ""
  };

  handleChange = e => {
    this.setState({ zipCode: e.target.value });
    e.preventDefault();
  };

  handleSubmit = e => {
    if (this.props.onFetchWeather) {
      this.props.onFetchWeather(this.state.zipCode);
      this.setState({ zipCode: "" });
    }
    e.preventDefault();
  };

  onSearchTypeSelect = type => {
    this.setState({ searchMethod: type }, () => {});
  };

  renderInputFieldByType = () => {
    switch (this.state.searchMethod) {
      case "city":
        return (
          <TextField
            placeholder="Enter city name"
            className={StyledTextField}
            onChange={this.handleChange}
            label="Enter city name"
            value={this.state.value}
            aria-label="Enter city name"
          />
        );

      case "coords":
        return (
          <TextField
            placeholder="Enter latitude and longitude"
            className={StyledTextField}
            onChange={this.handleChange}
            label="Enter latitude and longitude"
            value={this.state.value}
            aria-label="Enter latitude and longitude"
          />
        );

      case "zip":
        return (
          <TextField
            placeholder="Enter zip code"
            className={StyledTextField}
            onChange={this.handleChange}
            label="Enter zip code"
            value={this.state.value}
            aria-label="Enter zip code name"
          />
        );

      default:
        return <div>none</div>;
    }
  };

  render() {
    return (
      <div className={this.props.className}>
        <form onSubmit={this.handleSubmit}>
          <SearchOptions onSearchTypeSelect={this.onSearchTypeSelect} />
          {this.renderInputFieldByType()}

          <Button color="primary" variant="contained" type="submit">
            Get Weather
          </Button>
        </form>
      </div>
    );
  }
}

WeatherSearch.propTypes = {
  onFetchWeather: PropTypes.func.isRequired
};

export default WeatherSearch;
