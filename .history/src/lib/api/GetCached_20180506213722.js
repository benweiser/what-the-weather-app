import axios from 'axios';

// Note in a production app we'd need something more robust, redux-persist with localforage is a nice option

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
    console.log('async await response', response);
  } catch (error) {
    console.error('error', error);
    return false;
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
async function getCachedAjax(query, config, storageId) {
  const identifier = `bw.${storageId}`;
  if (sessionStorage.getItem(identifier) === null) {
    getRequest(query, config, identifier);
  }
  return JSON.parse(sessionStorage.getItem(identifier));
}

const EXPIRE_TIME = 600000; // 10 minutes

const expireSessionCache = (expireTime, identifier) => {
  const previousTimeStamp = JSON.parse(sessionStorage.getItem(identifier))
    .timestamp;
  if (new Date().getTime - previousTimeStamp > EXPIRE_TIME) {
  }
};

export default getCachedAjax;
