import React from 'react';
import renderer from 'react-test-renderer';

import Dark from './Dark';

describe('Dark Test', () => {
  const component = renderer.create(<Dark />);
  let tree = null;

  beforeEach(() => {
    tree = component.toJSON();
  });

  test('Correctly rendered', () => {
    expect(tree).toMatchSnapshot();
  });

  test('Have only 1 children', () => {
    expect(tree.children).toHaveLength(1);
  });

  test('Have 2 childrens', () => {
    const tmpTree = renderer.create(<Dark crowned={true} />).toJSON();

    expect(tmpTree.children[0].children).toHaveLength(2);
  });
});
