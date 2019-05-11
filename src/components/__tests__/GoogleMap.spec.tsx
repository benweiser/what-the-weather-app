import { render } from 'react-testing-library';
import React, { Suspense } from 'react';
import GoogleMap from '../GoogleMap';

describe('Google Map Component', () => {
  it('should render a Google Map', () => {
    const { container } = render(
      <Suspense fallback="...">
        <GoogleMap
          center={{
            lat: 323,
            lng: 323
          }}
        />
      </Suspense>
    );

    expect(container).toMatchSnapshot();
  });
});
