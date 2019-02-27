import renderer from 'react-test-renderer';
import React from 'react';
import GoogleMap from '../GoogleMap';

describe('Google Map component', () => {
  test('renders', () => {
    const component = renderer.create(
      <GoogleMap
        center={{
          lat: 323,
          lon: 323
        }}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
