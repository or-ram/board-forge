import React from 'react';
import renderer from 'react-test-renderer';

import Light from './Light';

describe('Light Test', () => {
  const component = renderer.create(<Light />);
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
    const tmpTree = renderer.create(<Light crowned={true} />).toJSON();

    expect(tmpTree.children[0].children).toHaveLength(3);
  });
});
