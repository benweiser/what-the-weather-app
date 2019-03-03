import { render } from 'react-testing-library';
import React from 'react';
import WeatherStats from '../WeatherStats';
import { mockWeatherData } from '../__mocks__/weatherData';

describe('Weather Stats', () => {
  it('renders', () => {
    const { container } = render(<WeatherStats data={mockWeatherData} />);
    expect(container).toMatchSnapshot();
  });
});
