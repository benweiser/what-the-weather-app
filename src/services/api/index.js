import {
  getWeatherByCity,
  getWeatherByCoords,
  getWeatherByZipCode
} from './WeatherService';
import { getFlickrPhotosByCoords } from './FlickrService';

const API = {
  getWeatherByZipCode,
  getWeatherByCoords,
  getWeatherByCity,
  getFlickrPhotosByCoords
};

export default API;
