import mockAxios from 'axios';
import API from '../index';
import apiKey from '../../../apiKey';

describe('API', () => {
  let mockConfig;
  let mockFlickrConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfig = {
      baseURL: '//api.openweathermap.org/data/2.5',
      params: {
        appid: apiKey,
        units: 'imperial'
      },
      timeout: 1000
    };
    mockFlickrConfig = {
      baseURL: 'https://api.flickr.com/services/rest',
      params: {
        api_key: 'dbad3997fb3628fcb3b10832c56a7a2b',
        format: 'json',
        nojsoncallback: 1,
        sort: 'popular'
      },
      timeout: 2000
    };
  });

  it('should create a namespaced object for the API call', () => {
    expect(typeof API).toBe('object');
    expect(typeof API.getWeatherByCity).toBe('function');
    expect(typeof API.getWeatherByZipCode).toBe('function');
    expect(typeof API.getWeatherByZipCode).toBe('function');
    expect(typeof API.getFlickrPhotosByCoords).toBe('function');
  });

  it('should include a getWeather function', () => {
    expect(typeof API.getWeatherByCity).toBe('function');
  });

  it('should create a getWeather that wraps axios', () => {
    API.getWeatherByCity(`Chicago`, mockConfig);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/weather?q=Chicago`,
      mockConfig
    );
  });

  it('should get weather by zip code', () => {
    API.getWeatherByZipCode('89122', mockConfig);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/weather?zip=89122,us`,
      mockConfig
    );
  });

  it('should get weather by coordinates', () => {
    API.getWeatherByCoords(36.1699, 115.1398);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/weather?lat=36.1699&lon=115.1398`,
      mockConfig
    );
  });

  it('should get flickr photo by coords', () => {
    API.getFlickrPhotosByCoords(36.1699, 115.1398, 'Las Vegas');
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `?method=flickr.photos.search&lat=36.1699&lon=115.1398&text=Las%20Vegas%20skyline`,
      mockFlickrConfig
    );
  });
});
