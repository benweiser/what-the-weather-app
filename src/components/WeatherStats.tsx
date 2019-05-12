import React, { memo, Suspense } from 'react';
import Typography from '@material-ui/core/Typography';

import CurrentWeatherIcon from './CurrentWeatherIcon';
import { CurrentWeatherStats } from '../services/api/WeatherService';
import GoogleMap from './GoogleMap';

export interface WeatherStatsProps {
  data: CurrentWeatherStats;
}

const WeatherStats = ({ data }: WeatherStatsProps) => {
  if (!data) {
    return null;
  }

  const {
    currentConditions,
    lat,
    locationName,
    lon,
    sunsetTime,
    sunriseTime,
    temp,
    tempMax,
    tempMin,
    windSpeed
  } = data;

  return (
    <div data-testid="WeatherStats">
      {locationName && (
        <Typography variant="headline" component="h3" gutterBottom>
          City: {locationName}
        </Typography>
      )}
      {currentConditions && (
        <CurrentWeatherIcon currentConditions={currentConditions[0].id} />
      )}

      {lat && lon && (
        <p>
          Latitude: {lat}, Longitude: {lon}
        </p>
      )}

      {temp && <p>Current Temperature: {temp}</p>}
      {tempMin && <p>Today&#39;s Low: {tempMin}</p>}
      {tempMax && <p>Today&#39;s High: {tempMax}</p>}
      {currentConditions && (
        <div>
          Current Conditions:{' '}
          {currentConditions.map(condition => (
            <div key={`${condition.main}`}>{condition.main}</div>
          ))}
        </div>
      )}
      {sunsetTime && <p>Sunset Time: {sunsetTime}</p>}
      {sunriseTime && <p>Sunrise Time: {sunriseTime}</p>}
      {windSpeed && <p>Wind Speed: {windSpeed}</p>}

      {lat && lon && (
        <GoogleMap
          center={{
            lat,
            lng: lon
          }}
        />
      )}
    </div>
  );
};

export default WeatherStats;
