import get from 'lodash.get';
import { fetchCachedData } from './request';
import { flickrAPIKey } from '../../apiKey';

export const API_CONFIG = {
  baseURL: 'https://api.flickr.com/services/rest',
  params: {
    api_key: flickrAPIKey,
    format: 'json',
    nojsoncallback: 1,
    sort: 'popular'
  },
  timeout: 2000
};

export const getFlickrPhotosByCoords = async (
  lat?: number,
  lon?: number,
  text: string = ''
) => {
  if (!lat && !lon) {
    return [];
  }
  const response = await fetchCachedData(
    `?method=flickr.photos.search&lat=${lat}&lon=${lon}&text=${text}`,
    API_CONFIG,
    'photo'
  );

  const photosKey = 'data.photos.photo';
  return get(response, photosKey, []);
};

export interface FlickrPhotoInterface {
  farm: number;
  secret: string;
  server: string;
  id: string;
}

export const getRandomFlickrPhoto = (
  photos: ReadonlyArray<FlickrPhotoInterface>
): string => {
  if (!photos || !photos.length || !Array.isArray(photos)) {
    return '';
  }

  const photo: FlickrPhotoInterface = photos[0];

  const { farm, secret, server, id } = photo;
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`;
};
