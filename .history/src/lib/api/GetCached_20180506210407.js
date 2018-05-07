import axios from 'axios';

// Note in a production app we'd need something more robust, redux-persist with localforage is a nice option

/**
 * Gets data from session storage or makes a new ajax request if data isn't found in
 * storage to ensure we're not making extraneous calls
 *
 * @param {string} query - The query string for our request
 * @param {object} config - An axios configuration object
 */
function getCached(query, config) {
  const uniqueIdentifier = 'bw.weatherservice';
  if (sessionStorage.getItem(uniqueIdentifier) === null) {
    return async function{
      try {
        const { data } = await axios.get(query, config);
        console.log('async await response', data);
        sessionStorage.setItem(uniqueIdentifier, JSON.stringify(data));
      } catch (error) {
        console.error('error', error);
        return false;
      }
    };
  }
  return JSON.parse(sessionStorage.getItem(uniqueIdentifier));
}

export default getCached;
