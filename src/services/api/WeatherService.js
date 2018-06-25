import getCachedAjax from "./request";
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
/* async function getCurrentWeather(query) {
  try {
    const response = await axios.get(`/weather?q=${query}`, API_CONFIG);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
} */

const getWeather = query =>
  getCachedAjax(`/weather?q=${query}`, API_CONFIG, "weather");

const API = {
  getWeather
};

export default API;
