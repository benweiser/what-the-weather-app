import { render } from 'react-testing-library';
import React from 'react';
import WeatherPage from '../WeatherPage';

describe('Weather Page Component', () => {
  test('should render a weather page', () => {
    const { container } = render(<WeatherPage />);

    expect(container).toMatchSnapshot();
  });
});
