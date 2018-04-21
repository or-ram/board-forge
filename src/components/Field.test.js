import React from 'react';
import Field from './Field';
import renderer from 'react-test-renderer';

describe('Field Test', () => {
  const component = renderer.create(
    <Field row={0} col={0} />,
  );
  let tree = null;

  beforeEach(() => {
    tree = component.toJSON();
  });

  test('Correctly rendered', () => {
    expect(tree).toMatchSnapshot();
  });

  test('Dark class', () => {
    const darkTree = renderer.create(
      <Field row={0} col={1} />,
    ).toJSON();

    expect(darkTree.props.className).toMatch(/dark/);
  });

  test('Light class', () => {
    expect(tree.props.className).toMatch(/light/);
  });

  test('Moveable class', () => {
    const moveTree = renderer.create(
      <Field row={0} col={0} moveable={true} />,
    ).toJSON();

    expect(moveTree.props.className).toMatch(/moveable/);
  });

  describe('isFieldDark test', () => {
    test('coordinates 0 0 to be falsy', () => {
      expect(Field.isFieldDark({ row: 0, col: 0 })).toBeFalsy();
    });

    test('coordinates 0 1 to be truthy', () => {
      expect(Field.isFieldDark({ row: 0, col: 1 })).toBeTruthy();
    });

    test('coordinates 1 0 to be truthy', () => {
      expect(Field.isFieldDark({ row: 1, col: 0 })).toBeTruthy();
    });

    test('coordinates 1 1 to be falsy', () => {
      expect(Field.isFieldDark({ row: 1, col: 1 })).toBeFalsy();
    });
  });
});
