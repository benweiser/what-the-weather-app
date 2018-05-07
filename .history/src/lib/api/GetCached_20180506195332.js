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
        const { data } = await axios.get(query, config);
        sessionStorage.setItem(storageId, JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    };
  }
  return sessionStorage.getItem(storageId);
};
