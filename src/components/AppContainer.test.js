import React from 'react';
import AppContainer from './AppContainer';

describe('AppContainer Test', () => {
  test('Correctly rendered', () => {
    const wrapper = shallow(
      <AppContainer />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
