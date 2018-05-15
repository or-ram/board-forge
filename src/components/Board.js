import React, { Component } from 'react';
import Field from './Field';
import Dark from './pieces/Dark';
import Light from './pieces/Light';

const ROWS = 8;
const COLS = 8;

export default class Board extends Component {
  state = {
    fields: [],
    selectedField: null,
    lastType: '',
  };

  _newFields = [];
  _selectedField = null;

  componentWillMount () {
    const fields = [];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        fields.push({
          key: (row * ROWS) + col,
          row, col,
          stone: Field.isFieldDark({ row, col }) ? this._prepareStone(row) : null,
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
    const { key, row, col, stone, moveable } = field;

    return (
      <Field
        key={key}
        row={row}
        col={col}
        moveable={moveable}
        onFieldClick={this._handleFieldClick(field)}
      >
        {Field.isFieldDark({ row, col }) && this._renderStone(stone)}
      </Field>
    );
  }

  _renderStone (stone) {
    if (stone) {
      const { type, crowned } = stone;

      if (type === 'dark') {
        return <Dark crowned={crowned} />;
      }
      if (type === 'light') {
        return <Light crowned={crowned} />;
      }
    }

    return null;
  }

  _prepareStone (row) {
    if (Math.floor(row + 1) < Math.floor(ROWS / 2)) {
      return { type: 'dark', crowned: false };
    }

    if (Math.floor(row) > Math.floor(ROWS / 2)) {
      return { type: 'light', crowned: false };
    }

    return null;
  }

  _handleFieldClick = (field) => () => {
    const { moveable, stone } = field;

    this._selectedField = { ...field };
    this._clearHighlight();

    if (stone && stone.type !== this.state.lastType) {
      this._handleMovesHighlight();
    }
    else if (moveable) {
      this._handleMovement();
    }
  };

  _handleMovesHighlight () {
    this._highlightMoves(this._highlightInDirection);

    this.setState({
      fields: this._newFields,
      selectedField: this._selectedField,
    });
  }

  _handleMovement () {
    const { stone } = this.state.selectedField;

    this._moveToField();

    if (this._isStoneEaten()) {
      this._highlightMoves(this._highlightOnlyJumpsInDirection);
    }

    this.setState({
      fields: this._newFields,
      lastType: stone.type,
      selectedField: this._selectedField,
    });
  }

  _clearHighlight () {
    this._newFields = [ ...this.state.fields ];
    this._newFields.map((field) => field.moveable = false);
  }

  _highlightMoves (highlightInDirection) {
    const { row, col, stone: { type, crowned } } = this._selectedField;

    if (type === 'dark' || crowned) {
      if (col - 1 >= 0 && row + 1 < ROWS) {
        highlightInDirection('downLeft');
      }
      if (col + 1 < COLS && row + 1 < ROWS) {
        highlightInDirection('downRight');
      }
    }

    if (type === 'light' || crowned) {
      if (col - 1 >= 0 && row - 1 >= 0) {
        highlightInDirection('upLeft');
      }

      if (col + 1 < COLS && row - 1 >= 0) {
        highlightInDirection('upRight');
      }
    }
  }

  _highlightOnlyJumpsInDirection = (direction) => {
    const { type } = this._selectedField.stone;
    let field = this._nextField(direction, this._selectedField);

    if (field && field.stone && field.stone.type !== type) {
      field = this._nextField(direction, field);

      this._setHighlight(field, direction);
    }
  };

  _highlightInDirection = (direction) => {
    const { type, crowned } = this._selectedField.stone;
    let field = this._nextField(direction, this._selectedField);

    do {
      if (field && field.stone && field.stone.type !== type) {
        field = this._nextField(direction, field);

        this._setHighlight(field, direction);

        return;
      }

      this._setHighlight(field, direction);

      field = this._nextField(direction, this._newFields[field.key]);
    } while (crowned && field);
  };

  _setHighlight (field, direction) {
    if (field && !field.stone) {
      this._newFields[field.key].moveable = true;
      this._newFields[field.key].direction = direction;
    }
  }

  _nextField (direction, currentField) {
    switch (direction) {
      case 'upLeft':
        return this._newFields.find((field) => (
          field.col === currentField.col - 1 &&
          field.row === currentField.row - 1
        ));

      case 'upRight':
        return this._newFields.find((field) => (
          field.col === currentField.col + 1 &&
          field.row === currentField.row - 1
        ));

      case 'downLeft':
        return this._newFields.find((field) => (
          field.col === currentField.col - 1 &&
          field.row === currentField.row + 1
        ));

      case 'downRight':
        return this._newFields.find((field) => (
          field.col === currentField.col + 1 &&
          field.row === currentField.row + 1
        ));
    }
  }

  _isStoneEaten () {
    const { key, direction } = this._selectedField;
    let field = { ...this.state.selectedField };
    let isEaten = false;

    while (field && field.key !== key) {
      field = this._nextField(direction, field);

      if (field && field.key !== key && field.stone) {
        this._newFields[field.key].stone = null;

        isEaten = true;
      }
    }

    return isEaten;
  }

  _moveToField () {
    const { selectedField } = this.state;
    const { key, row } = this._selectedField;

    this._newFields[key].stone = { ...selectedField.stone };
    this._selectedField.stone = { ...selectedField.stone };
    this._newFields[selectedField.key].stone = null;

    if (row === ROWS - 1 || row === 0) {
      this._newFields[key].stone.crowned = true;
    }
  }
}
