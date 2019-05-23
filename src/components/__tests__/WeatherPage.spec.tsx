import { fireEvent, render, waitForElement } from 'react-testing-library';
import React from 'react';
import mockAxios from 'axios';

import WeatherPage from '../WeatherPage';
import { mockRawWeatherData } from '../__mocks__/weatherData';
import { API_CONFIG } from '../../services/api/WeatherService';
import * as Images from '../../utils/image';

const setup = () => render(<WeatherPage />);

describe('Weather Page Component', () => {
  let consoleErrorSpy: any;

  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(global.console, 'error')
      // eslint-disable-next-line
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
    await (mockAxios as any).request.mockImplementationOnce(() =>
      Promise.resolve({
        data: mockRawWeatherData
      })
    );

    const { getByTestId } = setup();
    const searchInput = getByTestId('WeatherSearchInput-city').querySelector(
      'input'
    )!;

    fireEvent.focus(searchInput);
    fireEvent.change(searchInput, { target: { value: 'Las Vegas' } });
    fireEvent.click(getByTestId('search-button'));

    expect(mockAxios.request).toHaveBeenCalledTimes(1);

    expect(mockAxios.request).toHaveBeenCalledWith({
      ...API_CONFIG,
      method: 'get',
      url: '/weather?q=Las%20Vegas'
    });

    await (mockAxios as any).request.mockImplementationOnce(() =>
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

    expect(mockAxios.request).toHaveBeenCalledTimes(1);

    jest
      .spyOn(Images, 'loadImage')
      .mockReturnValueOnce(Promise.resolve(new Image()));

    const weatherStatsNode = await waitForElement(() =>
      getByTestId('WeatherStats')
    );

    expect(weatherStatsNode).toHaveTextContent('Current Temperature:');
    done();
  });

  it('should handle errors on a failed search', async done => {
    (mockAxios as any).request.mockImplementation(() =>
      Promise.reject('search failed')
    );
    const { getByTestId } = setup();
    fireEvent.click(getByTestId('search-button'));
    expect(mockAxios.request).toHaveBeenCalledTimes(1);

    const errorContent = await waitForElement(() => getByTestId('error-text'));
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Could not fetchData',
      'search failed'
    );
    expect(errorContent).toHaveTextContent('An error occured');
    done();
  });
});
