import React, { Component } from 'react';
import Board from './Board';

export default class AppContainer extends Component {
  render () {
    return (
      <div id="app">
        <Board />
      </div>
    );
  }
}
