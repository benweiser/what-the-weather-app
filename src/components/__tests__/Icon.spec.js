import renderer from 'react-test-renderer';
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';
import React from 'react';
import Icon from '../Icon';

expect.addSnapshotSerializer(createSerializer(emotion));

describe('Icon component', () => {
  test('renders', () => {
    const component = renderer.create(<Icon name="wi test" size="xl" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
