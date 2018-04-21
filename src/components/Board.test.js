import React from 'react';
import Board from './Board';

describe('Board Test', () => {
  test('Shallow render', () => {
    const wrapper = mount(<Board />);

    expect(wrapper).toMatchSnapshot();
  });

  test('should show 2 moveable places', () => {
    const wrapper = mount(<Board />);

    wrapper.find({ col: 2, row: 5 }).simulate('click');

    expect(wrapper.find('.field-moveable').length).toEqual(2);
  });

  test('move', () => {
    const wrapper = mount(<Board />);

    wrapper.find({ col: 2, row: 5 }).simulate('click');
    wrapper.find({ col: 3, row: 4 }).simulate('click');

    expect(wrapper.find({ col: 3, row: 4 }).find('svg').length).toEqual(1);
  });

  test('wont move same color twice', () => {
    const wrapper = mount(<Board />);

    wrapper.find({ col: 2, row: 5 }).simulate('click');
    wrapper.find({ col: 3, row: 4 }).simulate('click');

    wrapper.find({ col: 4, row: 5 }).simulate('click');

    expect(wrapper.find('.field-moveable').length).toEqual(0);
  });

  test('wont jump over your color', () => {
    const wrapper = mount(<Board />);

    wrapper.find({ col: 2, row: 5 }).simulate('click');
    wrapper.find({ col: 3, row: 4 }).simulate('click');

    wrapper.find({ col: 4, row: 5 }).simulate('click');

    wrapper.find({ col: 5, row: 2 }).simulate('click');
    wrapper.find({ col: 4, row: 3 }).simulate('click');

    wrapper.find({ col: 4, row: 5 }).simulate('click');

    expect(wrapper.find('.field-moveable').length).toEqual(1);
  });

  test('jump', () => {
    const wrapper = mount(<Board />);

    wrapper.find({ col: 2, row: 5 }).simulate('click');
    wrapper.find({ col: 3, row: 4 }).simulate('click');

    wrapper.find({ col: 4, row: 5 }).simulate('click');

    wrapper.find({ col: 5, row: 2 }).simulate('click');
    wrapper.find({ col: 4, row: 3 }).simulate('click');

    wrapper.find({ col: 4, row: 5 }).simulate('click');

    wrapper.find({ col: 3, row: 4 }).simulate('click');
    wrapper.find({ col: 5, row: 2 }).simulate('click');

    expect(wrapper.find({ col: 5, row: 2 }).find('svg').length).toEqual(1);
    expect(wrapper.find({ col: 4, row: 3 }).find('svg').length).toEqual(0);
  });

  test('double jump', () => {
    const wrapper = mount(<Board />);

    wrapper.find({ col: 2, row: 5 }).simulate('click');
    wrapper.find({ col: 3, row: 4 }).simulate('click');

    wrapper.find({ col: 4, row: 5 }).simulate('click');

    wrapper.find({ col: 5, row: 2 }).simulate('click');
    wrapper.find({ col: 4, row: 3 }).simulate('click');

    wrapper.find({ col: 4, row: 5 }).simulate('click');

    wrapper.find({ col: 3, row: 4 }).simulate('click');
    wrapper.find({ col: 5, row: 2 }).simulate('click');

    wrapper.find({ col: 2, row: 3 }).simulate('click');
    wrapper.find({ col: 3, row: 2 }).simulate('click');

    wrapper.find({ col: 6, row: 5 }).simulate('click');
    wrapper.find({ col: 7, row: 4 }).simulate('click');

    wrapper.find({ col: 4, row: 1 }).simulate('click');
    wrapper.find({ col: 3, row: 2 }).simulate('click');

    wrapper.find({ col: 5, row: 6 }).simulate('click');
    wrapper.find({ col: 6, row: 5 }).simulate('click');

    wrapper.find({ col: 2, row: 3 }).simulate('click');
    wrapper.find({ col: 1, row: 4 }).simulate('click');

    wrapper.find({ col: 0, row: 5 }).simulate('click');
    wrapper.find({ col: 2, row: 3 }).simulate('click');
    wrapper.find({ col: 4, row: 1 }).simulate('click');

    expect(wrapper.find({ col: 4, row: 1 }).find('svg').length).toEqual(1);
  });

  test('move after jump', () => {
    const wrapper = mount(<Board />);

    wrapper.find({ col: 2, row: 5 }).simulate('click');
    wrapper.find({ col: 3, row: 4 }).simulate('click');

    wrapper.find({ col: 5, row: 2 }).simulate('click');
    wrapper.find({ col: 4, row: 3 }).simulate('click');

    wrapper.find({ col: 3, row: 4 }).simulate('click');
    wrapper.find({ col: 5, row: 2 }).simulate('click');

    wrapper.find({ col: 3, row: 2 }).simulate('click');
    wrapper.find({ col: 2, row: 3 }).simulate('click');

    wrapper.find({ col: 6, row: 5 }).simulate('click');
    wrapper.find({ col: 7, row: 4 }).simulate('click');

    wrapper.find({ col: 4, row: 1 }).simulate('click');
    wrapper.find({ col: 3, row: 2 }).simulate('click');

    wrapper.find({ col: 5, row: 6 }).simulate('click');
    wrapper.find({ col: 6, row: 5 }).simulate('click');

    wrapper.find({ col: 2, row: 3 }).simulate('click');
    wrapper.find({ col: 1, row: 4 }).simulate('click');

    wrapper.find({ col: 0, row: 5 }).simulate('click');
    wrapper.find({ col: 2, row: 3 }).simulate('click');
    wrapper.find({ col: 4, row: 1 }).simulate('click');

    wrapper.find({ col: 5, row: 0 }).simulate('click');
    wrapper.find({ col: 3, row: 2 }).simulate('click');

    expect(wrapper.find('.field-moveable').length).toEqual(0);
  });

  test('crowning', () => {
    const wrapper = mount(<Board />);

    wrapper.find({ col: 2, row: 5 }).simulate('click');
    wrapper.find({ col: 3, row: 4 }).simulate('click');

    wrapper.find({ col: 5, row: 2 }).simulate('click');
    wrapper.find({ col: 4, row: 3 }).simulate('click');

    wrapper.find({ col: 3, row: 4 }).simulate('click');
    wrapper.find({ col: 5, row: 2 }).simulate('click');

    wrapper.find({ col: 3, row: 2 }).simulate('click');
    wrapper.find({ col: 2, row: 3 }).simulate('click');

    wrapper.find({ col: 6, row: 5 }).simulate('click');
    wrapper.find({ col: 7, row: 4 }).simulate('click');

    wrapper.find({ col: 4, row: 1 }).simulate('click');
    wrapper.find({ col: 3, row: 2 }).simulate('click');

    wrapper.find({ col: 5, row: 6 }).simulate('click');
    wrapper.find({ col: 6, row: 5 }).simulate('click');

    wrapper.find({ col: 2, row: 3 }).simulate('click');
    wrapper.find({ col: 1, row: 4 }).simulate('click');

    wrapper.find({ col: 0, row: 5 }).simulate('click');
    wrapper.find({ col: 2, row: 3 }).simulate('click');
    wrapper.find({ col: 4, row: 1 }).simulate('click');

    wrapper.find({ col: 5, row: 0 }).simulate('click');
    wrapper.find({ col: 3, row: 2 }).simulate('click');

    wrapper.find({ col: 5, row: 2 }).simulate('click');
    wrapper.find({ col: 4, row: 1 }).simulate('click');

    wrapper.find({ col: 3, row: 2 }).simulate('click');
    wrapper.find({ col: 2, row: 3 }).simulate('click');

    wrapper.find({ col: 4, row: 1 }).simulate('click');
    wrapper.find({ col: 5, row: 0 }).simulate('click');

    expect(wrapper.find({ crowned: true })).toMatchSnapshot();
    expect(wrapper.find({ crowned: true }).length).toEqual(1);

    wrapper.find({ col: 1, row: 2 }).simulate('click');
    wrapper.find({ col: 0, row: 3 }).simulate('click');

    wrapper.find({ col: 5, row: 0 }).simulate('click');

    expect(wrapper.find('.field-moveable').length).toEqual(3);
  });
});
