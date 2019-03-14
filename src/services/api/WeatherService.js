import { getCachedAjax } from "./request";
import { openWeatherAPIKey } from "../../apiKey";

export const API_CONFIG = {
  baseURL: "//api.openweathermap.org/data/2.5",
  params: {
    appid: openWeatherAPIKey,
    units: "imperial"
  },
  timeout: 1000
};

/**
 * Gets the current weather
 * @param {string} query - the query param for making this api request
 */
const getCurrentWeather = query =>
  getCachedAjax(`/weather?${query}`, API_CONFIG, "weather");

/**
 *
 * @param {string} city
 */
export const getWeatherByCity = city => getCurrentWeather(`q=${city}`);

/**
 *
 * @param {string} zipCode
 */
export const getWeatherByZipCode = zipCode =>
  getCurrentWeather(`zip=${zipCode},us`);

/**
 *
 * @param {number} lat
 * @param {number} lon
 */
export const getWeatherByCoords = (lat, lon) =>
  getCurrentWeather(`lat=${lat}&lon=${lon}`);
