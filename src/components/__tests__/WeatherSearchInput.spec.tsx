import { render } from 'react-testing-library';
import React from 'react';

import WeatherSearchInput from '../WeatherSearchInput';

describe('Weather Search Input', () => {
  const testId = id => `WeatherSearchInput-${id}`;
  let props;

  beforeEach(() => {
    props = {
      onChange: jest.fn()
    };
  });

  it('should render a city search input', () => {
    const { getByTestId } = render(
      <WeatherSearchInput type={'city'} value="city" {...props} />
    );

    expect(getByTestId(testId('city')));
  });

  it('should render a zip search input', () => {
    const { getByTestId } = render(
      <WeatherSearchInput type={'zip'} value="zip" {...props} />
    );

    expect(getByTestId(testId('zip')));
  });

  it('should render a coords search input', () => {
    const { getByTestId } = render(
      <WeatherSearchInput type={'coords'} value="coords" {...props} />
    );

    expect(getByTestId(testId('coords')));
  });
});
