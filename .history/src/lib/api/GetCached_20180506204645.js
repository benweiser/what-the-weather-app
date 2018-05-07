import axios from 'axios';

/**
 * Generate a random hash, this is not a genuine GUID but should suffice for our purposes
 */
const uuid =
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
 * @param {string} query - The query string for our request
 * @param {object} config - An axios configuration object
 * @param {string} storageId - A unique identifier for session storage data
 */
async function getCached(query, config, storageId) {
  const uniqueIdentifier = storageId ? storageId + uuid : uuid;
  if (sessionStorage.getItem(uniqueIdentifier) === null) {
    try {
      const response = await axios.get(query, config);
      console.log('async await response', response);
      sessionStorage.setItem(uniqueIdentifier, JSON.stringify(response));
    } catch (error) {
      console.error('error', error);
      return false;
    }
  }
  // return sessionStorage.getItem(JSON.parse(storageId));
}

export default getCached;
