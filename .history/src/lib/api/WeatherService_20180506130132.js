import axios from 'axios';

const API_CONFIG = {
  basePath: 'https://api.openweathermap.org/data/',
  version: '2.5',
  apiKey: '3d75d3fd22342bb892e1650a52382b25',
  units: 'imperial'
};

/**
 * Gets the current weather
 * @param {string} query - the query param for making this api request
 */
const getCurrentWeather = query => {
  axios
    .get(
      `${API_CONFIG.basePath}${API_CONFIG.version}/weather?q=${query}&units=${
        API_CONFIG.units
      }&APPID=${API_CONFIG.apiKey}`
    )
    .then(response => console.log(response));
};

export default getCurrentWeather;

console.log(getCurrentWeather('London'));
