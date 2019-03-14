import React from "react";
import Typography from "@material-ui/core/Typography";

import CurrentWeatherIcon from "./CurrentWeatherIcon";
import GoogleMap from "./GoogleMap";

const WeatherStats = ({ data }) => {
  if (!data) {
    return null;
  }
  const {
    coord: { lat, lon } = {},
    main: { temp, temp_min, temp_max, humidity } = {},
    name,
    sys: { sunset, sunrise } = {},
    weather,
    wind: { deg, speed } = {}
  } = data;

  return (
    <div data-testid="WeatherStats">
      <Typography variant="headline" component="h3" gutterBottom>
        City: {name}
      </Typography>
      <CurrentWeatherIcon currentConditions={weather[0].id} />
      <p>
        Latitude: {lat}, Longitude: {lon}
      </p>
      <p>Current Temperature: {temp}</p>
      <p>Today's Low: {temp_min}</p>
      <p>Today's High: {temp_max}</p>
      <p>Current Humidity: {humidity}</p>
      <div>
        Current Conditions:{" "}
        {weather.map(condition => (
          <div key={`${condition.main}`}>{condition.main}</div>
        ))}
      </div>
      <p>Sunset Time: {sunset}</p>
      <p>Sunrise Time: {sunrise}</p>
      <p>Wind Speed: {speed}</p>
      <p>Wind Degree: {deg}</p>

      <GoogleMap
        center={{
          lat,
          lng: lon
        }}
      />
    </div>
  );
};

export default WeatherStats;
