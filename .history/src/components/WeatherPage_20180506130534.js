import React from 'react';
import getCurrentWeather from '../lib/api/WeatherService';

class WeatherPage extends React.Component {
  componentDidMount() {
    getCurrentWeather('Las Vegas');
  }

  render() {
    return (
      <div>
        <h1>Hello there!</h1>
      </div>
    );
  }
}

export default WeatherPage;
