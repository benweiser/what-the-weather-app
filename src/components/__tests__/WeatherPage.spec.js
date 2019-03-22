import { fireEvent, render, waitForElement } from 'react-testing-library';
import React from 'react';
import mockAxios from 'axios';

import WeatherPage from '../WeatherPage';
import { mockWeatherData } from '../__mocks__/weatherData';
import { API_CONFIG } from '../../services/api/WeatherService';

const setup = () => render(<WeatherPage />);

describe('Weather Page Component', () => {
  let consoleErrorSpy;
  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(global.console, 'error')
      .mockImplementationOnce(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.resetAllMocks();
  });
  it('should render a weather page', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should perform a weather search', async done => {
    const response = {
      data: {
        ...mockWeatherData
      }
    };
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    const { getByTestId } = setup();
    fireEvent.click(getByTestId('search-button'));
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    await expect(mockAxios.get).toHaveBeenCalledWith('/weather?q=', API_CONFIG);
    await mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          photos: {
            photo: {
              farm: 'test123',
              id: 123455,
              secret: 'e3sk3ksls9',
              server: 3432
            }
          }
        }
      })
    );
    expect(mockAxios.get).toHaveBeenCalledTimes(1);

    const weatherStatsNode = await waitForElement(() =>
      getByTestId('WeatherStats')
    );

    expect(weatherStatsNode).toHaveTextContent('Current Temperature:');
    done();
  });

  it('should handle errors on a failed search', async done => {
    mockAxios.get.mockImplementation(() => Promise.reject('search failed'));
    const { getByTestId } = setup();
    fireEvent.click(getByTestId('search-button'));
    expect(mockAxios.get).toHaveBeenCalledTimes(1);

    const errorContent = await waitForElement(() => getByTestId('error-text'));
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'getAjax method failed',
      'search failed'
    );
    expect(errorContent).toHaveTextContent('An error occured');
    done();
  });
});
