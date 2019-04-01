import { getCachedData, FetchDataResponse } from './request';
import { openWeatherAPIKey } from '../../apiKey';

export interface DailyWeatherStats {
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: string;
    temp_min: string;
    temp_max: string;
    humidity: string;
  };
  name: string;
  sys: {
    sunset: string;
    sunrise: string;
  };
  weather: ReadonlyArray<{
    id: number;
    main: string;
  }>;
  wind: {
    deg: string;
    speed: string;
  };
}

export const API_CONFIG = {
  baseURL: '//api.openweathermap.org/data/2.5',
  params: {
    appid: openWeatherAPIKey,
    units: 'imperial'
  },
  timeout: 1000
};

const getCurrentWeather = (query: string) =>
  getCachedData(`/weather?${query}`, API_CONFIG, 'weather');

export const getWeatherByCity = (city: string) =>
  getCurrentWeather(`q=${city}`);

export const getWeatherByZipCode = (zipCode: string) =>
  getCurrentWeather(`zip=${zipCode},us`);

export const getWeatherByCoords = (lat: string, lon: string) =>
  getCurrentWeather(`lat=${lat}&lon=${lon}`);
