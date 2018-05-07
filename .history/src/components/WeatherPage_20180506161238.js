import React from 'react';
import getCurrentWeather from '../lib/api/WeatherService';
import WeatherWidget from './WeatherWidget';

class WeatherPage extends React.Component {
  componentDidMount() {
    getCurrentWeather('Las Vegas');
  }

  render() {
    return (
      <div>
        <h1>Hello there!</h1>
        <WeatherWidget />
      </div>
    );
  }
}

export default WeatherPage;
