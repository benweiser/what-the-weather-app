import get from "lodash.get";
import { getCachedAjax } from "./request";
import { flickrAPIKey } from "../../apiKey";

// https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=da5f1fa111df65355aeee8f26beef6f7&text=Cleveland&sort=popular&is_commons=&format=json&nojsoncallback=1
// http://api.flickr.com/services/rest/?method=flickr.photos.search&text=Los%20Angeles&api_key=dbad3997fb3628fcb3b10832c56a7a2b&format=json&text=Cleveland

export const API_CONFIG = {
  baseURL: "https://api.flickr.com/services/rest",
  params: {
    api_key: flickrAPIKey,
    format: "json",
    nojsoncallback: 1,
    sort: "popular"
  },
  timeout: 2000
};

export const getFlickrPhotosByCoords = async (lat, lon, text = "") => {
  if (!lat || !lon) {
    return;
  }

  const response = await getCachedAjax(
    `?method=flickr.photos.search&lat=${lat}&lon=${lon}&text=${text} skyline`,
    API_CONFIG,
    "photo"
  );

  const photosKey = "data.photos.photo";
  return get(response, photosKey, undefined);
};

export const getRandomFlickrPhoto = photos => {
  if (!photos && !photos.length) {
    return null;
  }

  const photo = photos[Math.floor(Math.random() * photos.length - 1)];

  const { farm, secret, server, id } = photo;
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`;
};
