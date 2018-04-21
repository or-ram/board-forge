import React, { Component } from 'react';
import Field from './Field';
import Dark from './pieces/Dark';
import Light from './pieces/Light';

const ROWS = 8;
const COLS = 8;

export default class Board extends Component {
  state = {
    fields: [],
    chosenField: null,
    lastType: '',
  };

  componentWillMount () {
    const fields = [];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        fields.push({
          key: (row * ROWS) + col,
          row, col,
          man: Field.isFieldDark({ row, col }) ? this._prepareMan(row) : null,
          moveable: false,
          direction: '',
        });
      }
    }

    this.setState({ fields });
  }

  render () {
    return (
      <div className="board">
        {this.state.fields.map((field) => this._renderField(field))}
      </div>
    );
  }

  _renderField (field) {
    const { key, row, col, man, moveable } = field;

    return (
      <Field
        key={key}
        row={row}
        col={col}
        moveable={moveable}
        onFieldClick={this._handleFieldClick(field)}
      >
        {Field.isFieldDark({ row, col }) && this._renderMan(man)}
      </Field>
    );
  }

  _renderMan (man) {
    if (man) {
      const { type, crowned } = man;

      if (type === 'dark') {
        return <Dark crowned={crowned} />;
      }
      if (type === 'light') {
        return <Light crowned={crowned} />;
      }
    }

    return null;
  }

  _prepareMan (row) {
    if (Math.floor(row + 1) < Math.floor(ROWS / 2)) {
      return { type: 'dark', crowned: false };
    }

    if (Math.floor(row) > Math.floor(ROWS / 2)) {
      return { type: 'light', crowned: false };
    }

    return null;
  }

  _handleFieldClick = (field) => () => {
    if (field.man && field.man.type !== this.state.lastType) {
      this._getPossibleMoves(field);
    }
    else if (field.moveable) {
      this._moveToField(field);
    }
  };

  _getPossibleMoves = (field, jumpsOnly) => {
    const fields = this.state.fields.map((item) => {
      item.moveable = false;
      return item;
    });

    this.setState({
      fields: this._traversFieldsFromField(fields, field, jumpsOnly),
      chosenField: field,
    });
  };

  _getNextField = (direction, fields, { row: fieldRow, col: fieldCol }) => {
    switch (direction) {
      case 'upLeft':
        return fields.find((field) => (
          field.col === fieldCol - 1 &&
          field.row === fieldRow - 1
        ));

      case 'upRight':
        return fields.find((field) => (
          field.col === fieldCol + 1 &&
          field.row === fieldRow - 1
        ));

      case 'downLeft':
        return fields.find((field) => (
          field.col === fieldCol - 1 &&
          field.row === fieldRow + 1
        ));

      case 'downRight':
        return fields.find((field) => (
          field.col === fieldCol + 1 &&
          field.row === fieldRow + 1
        ));

      default:
        break;
    }
  };

  _traversFieldsFromField (fields, currentField, jumpsOnly) {
    const { row, col, man: { type, crowned } } = currentField;

    const setMoveable = (direction) => {
      let field = this._getNextField(direction, fields, currentField);

      if (field) {
        do {
          if (field.man && field.man.type !== type) {
            field = this._getNextField(direction, fields, field);

            if (field && !field.man) {
              fields[field.key].moveable = true;
              fields[field.key].direction = direction;
            }

            return;
          }

          if (jumpsOnly || field.man) {
            return;
          }

          if (field && !field.man) {
            fields[field.key].moveable = true;
            fields[field.key].direction = direction;
          }

          field = this._getNextField(direction, fields, fields[field.key]);
        } while (crowned && field);
      }
    };

    if (type === 'dark' || crowned) {
      if (col - 1 >= 0 && row + 1 < ROWS) {
        setMoveable('downLeft');
      }
      if (col + 1 < COLS && row + 1 < ROWS) {
        setMoveable('downRight');
      }
    }

    if (type === 'light' || crowned) {
      if (col - 1 >= 0 && row - 1 >= 0) {
        setMoveable('upLeft');
      }

      if (col + 1 < COLS && row - 1 >= 0) {
        setMoveable('upRight');
      }
    }

    return fields;
  }

  _clearJumpedMan = (field, toField, direction) => {
    const { fields } = this.state;

    do {
      field = this._getNextField(direction, fields, field);
    } while (!field.man && field.row !== toField.row && field.col !== toField.col);

    if (field.row !== toField.row && field.col !== toField.col) {
      return field;
    }

    return null;
  };

  _moveToField = ({ row: fieldRow, col: fieldCol, direction }) => {
    const { row, col, man } = this.state.chosenField;
    const toField = this.state.fields.find(
      (item) => item.row === fieldRow && item.col === fieldCol,
    );

    const jumpedField = this._clearJumpedMan(
      this.state.chosenField,
      toField,
      direction,
    );

    let fields = this.state.fields.map((item) => {
      item.moveable = false;
      return item;
    });

    fields = this.state.fields.map((item) => {
      if (item.row === fieldRow && item.col === fieldCol) {
        item.man = man;

        if (fieldRow === ROWS - 1 || fieldRow === 0) {
          item.man.crowned = true;
        }
      }

      if ((item.row === row && item.col === col) || item === jumpedField) {
        item.man = null;
      }

      return item;
    });

    if (jumpedField) {
      this.setState({
        fields,
        lastType: man.type,
      }, this._getPossibleMoves(toField, true));
    }
    else {
      this.setState({
        fields,
        lastType: man.type,
      });
    }
  };
}
