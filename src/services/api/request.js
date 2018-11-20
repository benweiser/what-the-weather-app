import axios from "axios";

// Note in a production app we'd need something more robust, redux-persist with localforage is a nice option

const EXPIRE_TIME = 600000; // 10 minutes
const SESSION_PREFIX = "bw";

/**
 *
 * @param {number} expireTime - The number of milliseconds to cache the response in sessionStorage
 * @param {object} response - A cached response to grab a timestamp from
 */
export const isExpired = (expireTime, response) =>
  new Date().getTime() - response.timestamp > expireTime;

/**
 *
 * @param {string} query - The query string for our request
 * @param {object} config - A configuration object for our ajax request
 */
export const getAjax = async (query, config) => {
  try {
    const { data } = await axios.get(query, config);
    const response = {
      data,
      query,
      timestamp: new Date().getTime()
    };
    return response;
  } catch (error) {
    console.error("error", error);
  }
};

/**
 * Gets data from session storage or makes a new ajax request if data isn't found in
 * storage to ensure we're not making extraneous calls
 *
 * @param {string} query - The query string for our request
 * @param {object} config - An axios configuration object
 * @param {string} storageId - A unique storage id
 */
export const getCachedAjax = (query, config, storageId) => {
  const cacheId = `${SESSION_PREFIX}.${storageId}`;

  const cachedResponse = sessionStorage.getItem(cacheId);

  if (cachedResponse) {
    const response = JSON.parse(cachedResponse);
    if (
      cachedResponse &&
      response.query === query &&
      !isExpired(EXPIRE_TIME, response)
    ) {
      return response;
    }
  }
  return getAjax(query, config).then(response => {
    if (response) {
      sessionStorage.setItem(cacheId, JSON.stringify(response));
    }
    return response;
  });
};
