import { PropTypes } from "prop-types";
import React from "react";
import Button from "./Button";
import Input from "./Input";

class WeatherWidget extends React.PureComponent {
  state = {
    zipCode: ""
  };

  handleChange = e => {
    this.setState({ zipCode: e.target.value });
    e.preventDefault();
  };

  handleSubmit = e => {
    this.props.fetchWeather(this.state.zipCode);
    e.preventDefault();
    console.log("this state", this.state);
  };

  render() {
    console.log("this props", this.props);
    console.log("this state", this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          placeholder="Enter city name"
          onChange={this.handleChange}
          value={this.state.value}
          aria-label="Enter city name"
        />
        <Button type="submit">Submit Data</Button>
      </form>
    );
  }
}

WeatherWidget.propTypes = {
  fetchWeather: PropTypes.func.isRequired
};

export default WeatherWidget;
