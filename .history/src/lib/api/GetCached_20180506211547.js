import axios from 'axios';

// Note in a production app we'd need something more robust, redux-persist with localforage is a nice option

/**
 * Gets data from session storage or makes a new ajax request if data isn't found in
 * storage to ensure we're not making extraneous calls
 *
 * @param {string} query - The query string for our request
 * @param {object} config - An axios configuration object
 * @param {string} storageId - A unique storage id
 */
async function getCached(query, config, storageId) {
  const identifier = `bw.${storageId}`;
  if (sessionStorage.getItem(identifier) === null) {
    try {
      const { data } = await axios.get(query, config);
      const response = {
        data,
        timestamp: new Date().getTime()
      };
      console.log('async await response', response);
      sessionStorage.setItem(identifier, JSON.stringify(response));
    } catch (error) {
      console.error('error', error);
      return false;
    }
  }
  return JSON.parse(sessionStorage.getItem(identifier));
}

export default getCached;
