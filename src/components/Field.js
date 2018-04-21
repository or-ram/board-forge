import React, { Component } from 'react';
import * as P from 'prop-types';
import cx from 'classnames';

export default class Field extends Component {
  static propTypes = {
    col: P.number.isRequired,
    row: P.number.isRequired,
    onFieldClick: P.func,
    moveable: P.bool,
  };

  static defaultProps = {
    onFieldClick () {},
    moveable: false,
  };

  static isFieldDark ({ row, col }) {
    return Boolean(row % 2 ? (col + 1) % 2 : col % 2);
  }

  render () {
    const classNames = cx('field', {
      'field-dark': Field.isFieldDark(this.props),
      'field-light': !Field.isFieldDark(this.props),
      'field-moveable': this.props.moveable,
    });

    return (
      <div
        className={classNames}
        onClick={this.props.onFieldClick}
      >
        {this.props.children}
      </div>
    );
  }

  _colorClass () {
    return `field-${Field.isFieldDark(this.props) ? 'dark' : 'light'}`;
  }
}
