import { render } from 'react-testing-library';
import React from 'react';

import CurrentWeatherIcon from '../CurrentWeatherIcon';

describe('Current Weather Icon', () => {
  it('should render an icon for a weather condition code', () => {
    const mockRainConditionsCode = 500;
    const { container, getByTestId } = render(
      <CurrentWeatherIcon currentConditions={mockRainConditionsCode} />
    );

    expect(container).toMatchSnapshot();
    expect(getByTestId('CurrentWeatherIcon')).toHaveClass('wi-day-rain');
  });
});
