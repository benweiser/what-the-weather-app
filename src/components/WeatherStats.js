import React from "react";
import Typography from "@material-ui/core/Typography";
import { css } from "emotion";

import CurrentWeatherIcon from "./CurrentWeatherIcon";

const WeatherStats = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <div>
      <Typography variant="headline" component="h3" gutterBottom>
        City: {data.name}
      </Typography>
      <CurrentWeatherIcon currentConditions={data.weather[0].id} />
      <p>
        Latitude: {data.coord.lat}, Longitude: {data.coord.lon}
      </p>
      <p>Current Temperature: {data.main.temp}</p>
      <p>Today's Low: {data.main.temp_min}</p>
      <p>Today's High: {data.main.temp_max}</p>
      <p>Current Humidity: {data.main.humidity}</p>
      <p>Current Conditions: {data.weather[0].description}</p>
      <p>Sunset Time: {data.sys.sunset}</p>
      <p>Sunrise Time: {data.sys.sunrise}</p>
      <p>Wind Speed: {data.wind.speed}</p>
      <p>Wind Degree: {data.wind.deg}</p>
    </div>
  );
};

export default WeatherStats;
