import React from 'react';
import Icon from './Icon';

export interface CurrentWeatherIconProps {
  currentConditions: number;
}

export const weather: { [key: number]: string } = {
  200: 'wi-thunderstorm',
  201: 'wi-thunderstorm',
  202: 'wi-thunderstorm',
  500: 'wi-day-rain',
  501: 'wi-day-rain',
  502: 'wi-day-rain',
  503: 'wi-day-rain',
  504: 'wi-day-rain',
  511: 'wi-day-showers',
  520: 'wi-day-showers',
  521: 'wi-day-showers',
  522: 'wi-day-showers',
  531: 'wi-day-showers',
  701: 'wi-raindrop',
  721: 'wi-day-haze',
  800: 'wi-day-sunny',
  801: 'wi-day-cloudy',
  802: 'wi-day-cloudy',
  803: 'wi-day-cloudy',
  804: 'wi-cloudy'
};

const CurrentWeatherIcon = ({ currentConditions }: CurrentWeatherIconProps) => {
  return (
    <Icon
      data-testid="CurrentWeatherIcon"
      size="xl"
      name={weather[currentConditions]}
    />
  );
};

export default CurrentWeatherIcon;
