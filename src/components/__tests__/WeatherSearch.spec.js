import { fireEvent, render } from 'react-testing-library';
import React from 'react';

import WeatherSearch from '../WeatherSearch';

const setup = () => render(<WeatherSearch onFetchWeather={jest.fn()} />);

describe('Weather Widget Snapshot', () => {
  it('renders a weather widget', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
