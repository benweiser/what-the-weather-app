import axios from 'axios';

async function getCurrentWeather(query) {
  try {
    const response = await axios.get(`/weather?q=${query}`, API_CONFIG);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param {string} storageId - A unique identifier for session storage data
 * @param {string} query - The query string for our request
 * @param {object} config - An axios configuration object
 */
const getCached = (storageId, query, config) => {
  if (sessionStorage.getItem(storageId) === null) {
    return async () => {
      try {
        const { data } = await axios.get(query, config);
        sessionStorage.setItem(storageId, JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    };
  }
  return sessionStorage.getItem(storageId);
};

export default getCached;
