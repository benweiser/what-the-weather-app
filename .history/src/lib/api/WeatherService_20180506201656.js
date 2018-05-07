import axios from 'axios';
import getCached from './GetCached';

const API_CONFIG = {
  baseURL: '//api.openweathermap.org/data/2.5',
  params: {
    appid: '3d75d3fd22342bb892e1650a52382b25',
    units: 'imperial'
  },
  timeout: 1000
};

/**
 * Gets the current weather
 * @param {string} query - the query param for making this api request
 */
async function getCurrentWeather(query) {
  try {
    const response = await axios.get(`/weather?q=${query}`, API_CONFIG);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

const getWeather = query => getCached(`/weather?q={query}`, API_CONFIG);

export default getWeather;

console.log(getWeather('London'));
