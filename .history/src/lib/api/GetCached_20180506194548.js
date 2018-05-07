import axios from 'axios';

async function getCurrentWeather(query) {
  try {
    const response = await axios.get(`/weather?q=${query}`, API_CONFIG);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

const getCached = (storageId, query, config) => {
  if (sessionStorage.getItem(storageId) === null) {
    return async () => {
      try {
        const response = await axios.get(query, config);
      } catch (error) {
        console.error(error);
      }
    };
  }
};
