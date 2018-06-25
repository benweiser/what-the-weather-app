import axios from 'axios';

// Note in a production app we'd need something more robust, redux-persist with localforage is a nice option

const EXPIRE_TIME = 600000; // 10 minutes
const SESSION_PREFIX = 'bw';

/**
 *
 * @param {number} expireTime - The number of milliseconds to cache the response in sessionStorage
 * @param {object} response - A cached response to grab a timestamp from
 */
const isExpired = (expireTime, response) =>
  new Date().getTime() - response.timestamp > expireTime;
/**
 *
 * @param {string} query - The query string for our request
 * @param {object} config - A configuration object for our ajax request
 * @param {boolean} storeInSession - Whether or not to store this response in sessionStorage
 * @param {string} storageId - If storeInSession is true here we can set an id
 */
async function getRequest(query, config, storeInSession, storageId) {
  try {
    const { data } = await axios.get(query, config);
    // We could pass our data through an obj constructor to model if necssary
    const response = {
      data,
      query,
      timestamp: new Date().getTime()
    };
    if (storeInSession && storageId) {
      sessionStorage.setItem(storageId, JSON.stringify(response));
    }
  } catch (error) {
    console.error('error', error);
  }
}

/**
 * Gets data from session storage or makes a new ajax request if data isn't found in
 * storage to ensure we're not making extraneous calls
 *
 * @param {string} query - The query string for our request
 * @param {object} config - An axios configuration object
 * @param {string} storageId - A unique storage id
 */
const getCachedAjax = (query, config, storageId) => {
  console.log('get cached ajax called');
  const identifier = `${SESSION_PREFIX}.${storageId}`;
  const sessionState = sessionStorage.getItem(identifier);
  const storedResponse = JSON.parse(sessionState);
  if (
    sessionState === null ||
    (storedResponse.query !== query && storedResponse !== undefined)
  ) {
    return getRequest(query, config, true, identifier);
  }
  return isExpired(EXPIRE_TIME, storedResponse)
    ? getRequest(query, config, true, identifier)
    : storedResponse;
};

export default getCachedAjax;
