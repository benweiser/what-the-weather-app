import { render } from 'react-testing-library';
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';
import React from 'react';
import Icon from '../Icon';
expect.addSnapshotSerializer(createSerializer(emotion));

describe('Icon component', () => {
  it('should render an icon', () => {
    const { container } = render(<Icon name="wi test" size="xl" />);
    expect(container).toMatchSnapshot();
  });
});
