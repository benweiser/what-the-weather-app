import { CurrentWeatherStats } from './../../services/api/WeatherService';

export const mockRawWeatherData = {
  name: 'Test',
  coord: {
    lat: 23,
    lon: 32
  },
  weather: [
    {
      id: 500,
      icon: 'xyz',
      description: 'Test description',
      main: 'Test'
    }
  ],
  main: {
    humidity: 40,
    temp: 45,
    temp_min: 23,
    temp_max: 79
  },
  sys: {
    sunrise: '5:00',
    sunset: '8:00'
  },
  wind: {
    speed: 43,
    deg: 43
  }
};

export const mockCurrentWeatherStats: CurrentWeatherStats = {
  currentConditions: [
    {
      description: 'Test description',
      icon: 'xyz',
      id: 500,
      main: 'Test'
    }
  ],
  lat: 23,
  locationName: 'Test',
  lon: 32,
  sunriseTime: '5:00',
  sunsetTime: '8:00',
  temp: 45,
  tempMax: 79,
  tempMin: 23,
  windSpeed: 43
};
