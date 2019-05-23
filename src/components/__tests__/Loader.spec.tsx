import { render } from 'react-testing-library';
import React from 'react';

import Loader from '../Loader';

describe('Loader Component', () => {
  it('renders', () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});
