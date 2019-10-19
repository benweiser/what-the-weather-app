import get from 'lodash.get';

import { fetchCachedData } from './request';
import { openWeatherAPIKey } from '../../apiKey';

export interface WeatherCondition {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface CurrentWeatherStats {
  lat: number;
  lon: number;
  currentConditions: ReadonlyArray<WeatherCondition>;
  locationName: string;
  sunsetTime: number;
  sunriseTime: number;
  temp: number;
  tempMax: number;
  tempMin: number;
  windSpeed: number;
}

export const API_CONFIG = {
  baseURL: '//api.openweathermap.org/data/2.5',
  params: {
    appid: openWeatherAPIKey,
    units: 'imperial'
  },
  timeout: 1000
};

export const serializeCurrentWeatherData = (
  data: unknown
): CurrentWeatherStats => {
  const currentWeather = get(data, 'weather');
  const mainTemp = get(data, 'main');
  const sunPosition = get(data, 'sys');
  const wind = get(data, 'wind');
  return {
    lat: get(data, 'coord.lat'),
    lon: get(data, 'coord.lon'),
    currentConditions: Array.isArray(currentWeather)
      ? currentWeather.map(weatherCondition => {
          return {
            main: get(weatherCondition, 'main'),
            description: get(weatherCondition, 'description'),
            icon: get(weatherCondition, 'icon'),
            id: get(weatherCondition, 'id')
          };
        })
      : [],
    locationName: get(data, 'name'),
    temp: get(mainTemp, 'temp'),
    tempMin: get(mainTemp, 'temp_min'),
    tempMax: get(mainTemp, 'temp_max'),
    sunriseTime: get(sunPosition, 'sunrise'),
    sunsetTime: get(sunPosition, 'sunset'),
    windSpeed: get(wind, 'speed')
  };
};

export const getCurrentWeather = async (
  query: string
): Promise<CurrentWeatherStats | undefined> => {
  const currentWeather = await fetchCachedData(
    `/weather?${query}`,
    API_CONFIG,
    'weather'
  );

  if (!currentWeather) {
    return;
  }

  return serializeCurrentWeatherData(currentWeather.data || {});
};

export const getWeatherByCity = (city: string) =>
  getCurrentWeather(`q=${city}`);

export const getWeatherByZipCode = (zipCode: string) =>
  getCurrentWeather(`zip=${zipCode},us`);

export const getWeatherByCoords = (lat: number, lon: number) =>
  getCurrentWeather(`lat=${lat}&lon=${lon}`);
