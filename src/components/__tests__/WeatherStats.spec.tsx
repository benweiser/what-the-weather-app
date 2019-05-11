import { render, waitForElement } from 'react-testing-library';
import React, { Suspense } from 'react';
import WeatherStats from '../WeatherStats';
import { mockCurrentWeatherStats } from '../__mocks__/weatherData';

describe('Weather Stats', () => {
  it('renders', async () => {
    const { container } = render(
      <Suspense fallback="...">
        <WeatherStats data={mockCurrentWeatherStats} />
      </Suspense>
    );
    const lazyElement = await waitForElement(() => container);
    expect(lazyElement).toMatchSnapshot();
  });
});
