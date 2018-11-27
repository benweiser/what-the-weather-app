import get from 'lodash.get';
import { getCachedAjax, getAjax } from './request';

// https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=da5f1fa111df65355aeee8f26beef6f7&text=Cleveland&sort=popular&is_commons=&format=json&nojsoncallback=1
// http://api.flickr.com/services/rest/?method=flickr.photos.search&text=Los%20Angeles&api_key=dbad3997fb3628fcb3b10832c56a7a2b&format=json&text=Cleveland

export const API_CONFIG = {
  baseURL: 'https://api.flickr.com/services/rest',
  params: {
    api_key: 'dbad3997fb3628fcb3b10832c56a7a2b',
    format: 'json',
    nojsoncallback: 1,
    sort: 'popular'
  },
  timeout: 2000
};

export const getFlickrPhotosByCoords = async (lat, lon, text = '') => {
  const response = await Promise.resolve(
    getCachedAjax(
      `?method=flickr.photos.search&lat=${lat}&lon=${lon}&text=${text} skyline`,
      API_CONFIG,
      'photo'
    )
  );
  const photosKey = 'data.photos.photo';
  return get(response, photosKey, []);
};

export const getRandomPhoto = photos => {
  if (!photos.length) {
    return null;
  }

  const photo = photos[0];
  const { farm, secret, server, id } = photo;
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`;
};
