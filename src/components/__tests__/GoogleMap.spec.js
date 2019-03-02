import renderer from 'react-test-renderer';
import React from 'react';
import GoogleMap from '../GoogleMap';

describe('Google Map component', () => {
  it('renders', () => {
    const component = renderer.create(
      <GoogleMap
        center={{
          lat: 323,
          lng: 323
        }}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
