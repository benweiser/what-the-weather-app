import {
  getCurrentWeather,
  getWeatherByCity,
  getWeatherByCoords,
  getWeatherByZipCode
} from './WeatherService';
import { getFlickrPhotosByCoords } from './FlickrService';

const API = {
  getCurrentWeather,
  getFlickrPhotosByCoords,
  getWeatherByCoords,
  getWeatherByCity,
  getWeatherByZipCode
};

export default API;
