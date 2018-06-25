import React from "react";
import getWeather from "../lib/api/WeatherService";
import WeatherWidget from "./WeatherWidget";

class WeatherPage extends React.Component {
  fetchWeather = location => {
    this.setState({
      data: getWeather(location)
    });
  };

  render() {
    return <WeatherWidget fetchWeather={this.fetchWeather} />;
  }
}

export default WeatherPage;
