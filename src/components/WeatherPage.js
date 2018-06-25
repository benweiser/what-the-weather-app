import React from "react";
import API from "../services/api/WeatherService";
import WeatherWidget from "./WeatherWidget";

class WeatherPage extends React.Component {
  state = {
    data: {}
  };
  fetchWeather = location => {
    console.log("test", API.getWeather(location));
    /*     API.getWeather(location).then(locationData => {
      return this.setState({ data: locationData });
    }); */
  };

  render() {
    console.log(this.state.data);
    return <WeatherWidget fetchWeather={this.fetchWeather} />;
  }
}

export default WeatherPage;
