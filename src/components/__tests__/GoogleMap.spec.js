import { render } from 'react-testing-library';
import React from 'react';
import GoogleMap from '../GoogleMap';

describe('Google Map Component', () => {
  it('should render a Google Map', () => {
    const { container } = render(
      <GoogleMap
        center={{
          lat: 323,
          lng: 323
        }}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
