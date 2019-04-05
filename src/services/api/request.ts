import axios, { AxiosRequestConfig } from 'axios';

export interface FetchDataResponse {
  data?: unknown;
  query?: string;
  timestamp: number;
}

const EXPIRE_TIME = 600000; // 10 minutes
const SESSION_PREFIX = 'bw';

export const isExpired = (expireTime: number, response: FetchDataResponse) =>
  new Date().getTime() - response.timestamp > expireTime;

export const fetchData = async (
  query: string,
  config: AxiosRequestConfig
): Promise<FetchDataResponse | undefined> => {
  try {
    const { data } = await axios.request({
      method: 'get',
      url: encodeURI(query),
      ...config
    });

    const response = {
      data,
      query,
      timestamp: new Date().getTime()
    };
    return response;
  } catch (e) {
    console.error('Could not fetchData', e);
  }
};

/**
 * Gets data from session storage or makes a new ajax request if data isn't found in
 * storage to ensure we're not making extraneous calls
 */
export const fetchCachedData = async (
  query: string,
  config: AxiosRequestConfig,
  storageId: string
): Promise<FetchDataResponse | undefined> => {
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

  const response = await fetchData(query, config);
  if (response) {
    sessionStorage.setItem(cacheId, JSON.stringify(response));
    return response;
  }
};
