import mockAxios, { AxiosRequestConfig } from 'axios';
import API from '../../api';
import { openWeatherAPIKey } from '../../../apiKey';
import { serializeCurrentWeatherData } from '../WeatherService';
import {
  mockRawWeatherData,
  mockCurrentWeatherStats
} from '../../../components/__mocks__/weatherData';

describe('API', () => {
  let mockConfig: AxiosRequestConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfig = {
      baseURL: '//api.openweathermap.org/data/2.5',
      params: {
        appid: openWeatherAPIKey,
        units: 'imperial'
      },
      timeout: 1000
    };
  });

  it('should create a getCurrentWeather method', () => {
    API.getCurrentWeather('test');
    expect(mockAxios.request).toHaveBeenCalledTimes(1);
    expect(mockAxios.request).toHaveBeenCalledWith({
      ...mockConfig,
      method: 'get',
      url: '/weather?test'
    });
  });

  it('should get weather by city name', () => {
    API.getWeatherByCity(`Chicago`);
    expect(mockAxios.request).toHaveBeenCalledTimes(1);
    expect(mockAxios.request).toHaveBeenCalledWith({
      ...mockConfig,
      method: 'get',
      url: `/weather?q=Chicago`
    });
  });

  it('should get weather by zip code', () => {
    API.getWeatherByZipCode('89122');
    expect(mockAxios.request).toHaveBeenCalledTimes(1);
    expect(mockAxios.request).toHaveBeenCalledWith({
      ...mockConfig,
      method: 'get',
      url: `/weather?zip=89122,us`
    });
  });

  it('should get weather by coordinates', () => {
    API.getWeatherByCoords(36.1699, 115.1398);
    expect(mockAxios.request).toHaveBeenCalledTimes(1);
    expect(mockAxios.request).toHaveBeenCalledWith({
      ...mockConfig,
      method: 'get',
      url: `/weather?lat=36.1699&lon=115.1398`
    });
  });

  it('should serialize the current weather data response', () => {
    expect(serializeCurrentWeatherData(mockRawWeatherData)).toEqual(
      mockCurrentWeatherStats
    );
  });
});
