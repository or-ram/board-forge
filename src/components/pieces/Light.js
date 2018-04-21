import React, { PureComponent } from 'react';
import * as P from 'prop-types';

export default class Light extends PureComponent {
  static propTypes = {
    crowned: P.bool,
    height: P.number,
    width: P.number,
  };

  static defaultProps = {
    crowned: false,
    height: 70,
    width: 70,
  };

  render () {
    const { crowned, height, width } = this.props;

    return (
      <div className="man">
        <svg width={width} height={height} viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="38" stroke="black" strokeWidth="4" fill="white" />
          <circle cx="40" cy="40" r="22" stroke="black" strokeWidth="4" fill="white" />
          {
            crowned &&
            <circle cx="40" cy="40" r="14" fill="black" />
          }
        </svg>
      </div>
    );
  }
}
