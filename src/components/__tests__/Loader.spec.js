import { render } from 'react-testing-library';
import React from 'react';
import Loader from '../Loader';
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';

expect.addSnapshotSerializer(createSerializer(emotion));

describe('Loader Component', () => {
  it('renders', () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});
