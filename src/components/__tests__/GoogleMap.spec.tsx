import { render, waitForElement } from 'react-testing-library';
import React from 'react';
import GoogleMap from '../GoogleMap';

describe('Google Map Component', () => {
  it('should render a Google Map', async () => {
    const { container } = render(
      <GoogleMap
        center={{
          lat: 323,
          lng: 323
        }}
      />
    );
    const lazyElement = await waitForElement(() => container);
    expect(lazyElement).toMatchSnapshot();
  });
});
