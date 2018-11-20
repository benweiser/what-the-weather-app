import { getCachedAjax } from "./request";
import apiKey from "../../apiKey";

export const API_CONFIG = {
  baseURL: "//api.openweathermap.org/data/2.5",
  params: {
    appid: apiKey,
    units: "imperial"
  },
  timeout: 1000
};

/**
 * Gets the current weather
 * @param {string} query - the query param for making this api request
 */
const getWeather = query => {
  return Promise.resolve(
    getCachedAjax(`/weather?${query}`, API_CONFIG, "weather")
    // getAjax(`/weather?${query}`, API_CONFIG, "weather")
  );
};

/**
 *
 * @param {string} city
 */
const getWeatherByCity = city => getWeather(`q=${city}`);

/**
 *
 * @param {string} zipCode
 */
const getWeatherByZipCode = zipCode => getWeather(`zip=${zipCode},us`);

/**
 *
 * @param {number} lat
 * @param {number} lon
 */
const getWeatherByCoords = (lat, lon) => getWeather(`lat=${lat}&lon=${lon}`);

const API = {
  getWeatherByZipCode,
  getWeatherByCoords,
  getWeatherByCity
};

export default API;
