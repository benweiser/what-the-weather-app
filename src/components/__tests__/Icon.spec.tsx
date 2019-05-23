import { render } from 'react-testing-library';
import React from 'react';

import Icon from '../Icon';

describe('Icon component', () => {
  it('should render an icon', () => {
    const { container } = render(<Icon name="wi test" size="xl" />);
    expect(container).toMatchSnapshot();
  });
});
