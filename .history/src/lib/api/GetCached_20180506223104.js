import axios from 'axios';

// Note in a production app we'd need something more robust, redux-persist with localforage is a nice option

/**
 *
 * @param {sring} query - The query string for our request
 * @param {object} config - A configuration object for our ajax request
 * @param {boolean} storeInSession - Whether or not to store this response in sessionStorage
 * @param {string} storageId - If storeInSession is true here we can set an id
 */
async function getRequest(query, config, storeInSession, storageId) {
  try {
    const { data } = await axios.get(query, config);
    // We could pass our data through an obj constructor to model it if necssary
    const response = {
      data,
      timestamp: new Date().getTime()
    };
    if (storeInSession && storageId) {
      sessionStorage.setItem(storageId, JSON.stringify(response));
    }
  } catch (error) {
    console.error('error', error);
  }
  // return false;
}

const EXPIRE_TIME = 600000; // 10 minutes

const isExpired = (expireTime, response) =>
  new Date().getTime - response.timestamp > expireTime;
/**
 * Gets data from session storage or makes a new ajax request if data isn't found in
 * storage to ensure we're not making extraneous calls
 *
 * @param {string} query - The query string for our request
 * @param {object} config - An axios configuration object
 * @param {string} storageId - A unique storage id
 */
const getCachedAjax = (query, config, storageId) => {
  const identifier = `bw.${storageId}`;
  if (sessionStorage.getItem(identifier) === null) {
    return getRequest(query, config, true, identifier);
  }
  const storedResponse = JSON.parse(sessionStorage.getItem(identifier));
  return isExpired(storedResponse, EXPIRE_TIME)
    ? getRequest(query, config, true, identifier)
    : storedResponse;
};

export default getCachedAjax;
