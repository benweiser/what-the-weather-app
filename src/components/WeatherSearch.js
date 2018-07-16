import { PropTypes } from "prop-types";
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { css } from "emotion";

const StyledTextField = css`
  width: 380px;
`;

class WeatherSearch extends React.PureComponent {
  state = {
    zipCode: ""
  };

  handleChange = e => {
    this.setState({ zipCode: e.target.value });
    e.preventDefault();
  };

  handleSubmit = e => {
    if (this.props.fetchWeather) {
      this.props.fetchWeather(this.state.zipCode);
      this.setState({ zipCode: "" });
    }
    e.preventDefault();
  };

  render() {
    return (
      <div className={this.props.className}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            placeholder="Enter city name"
            className={StyledTextField}
            onChange={this.handleChange}
            label="Enter city name"
            value={this.state.value}
            aria-label="Enter city name"
          />
          <Button color="primary" variant="contained" type="submit">
            Submit Data
          </Button>
        </form>
      </div>
    );
  }
}

WeatherSearch.propTypes = {
  fetchWeather: PropTypes.func.isRequired
};

export default WeatherSearch;
