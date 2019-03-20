import API from '../index';

describe('API', () => {
  it('should create a namespaced object for the API call', () => {
    expect(typeof API).toBe('object');
    expect(typeof API.getWeatherByCity).toBe('function');
    expect(typeof API.getWeatherByZipCode).toBe('function');
    expect(typeof API.getWeatherByZipCode).toBe('function');
    expect(typeof API.getFlickrPhotosByCoords).toBe('function');
  });
});
