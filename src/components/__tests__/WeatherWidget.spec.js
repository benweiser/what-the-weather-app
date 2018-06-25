import renderer from 'react-test-renderer';
import React from 'react';
import WeatherWidget from '../WeatherWidget';

describe('Weather Widget Snapshot', () => {
  test('renders', () => {
    const component = renderer.create(<WeatherWidget />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
