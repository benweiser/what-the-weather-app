import axios from "axios";

async function getCurrentWeather(query) {
  try {
    const response = await axios.get(`/weather?q=${query}`, API_CONFIG);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

const uuid = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

// Note in a production app we'd need something more robust, redux-persist with localforage is a nice option

/**
 * Gets data from session storage or makes a new ajax request if data isn't found in
 * storage to ensure we're not making extraneous calls
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
  return sessionStorage.getItem(JSON.parse(storageId));
};

export default getCached;

// es6
const add = (a, b) => a + b;

// es5
var add = function(a, b) {
  return a + b;
};

console.log(add(2, 2));
