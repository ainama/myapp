import React from 'react';
import PropTypes from 'prop-types';

import Button from './button.js';


class AddTodo extends React.Component {
  constructor(props) {
    super(props);
  }

  addClick(value) {
    this.props.onClick(value);
    this.refs.input.value = '';
  }

  render() {
    return (
      <div className = { this.props.className }>
        <div className = 'add-title'>添加TODO</div>
        <input
          className = 'add-input'
          ref = 'input'
          placeholder = '请输入TODO内容' />
        <div>
          <Button
            className = 'add-button'
            text = '保存'
            onClick = { () => { this.addClick(this.refs.input.value); } } />
        </div>
      </div>
    );
  }
}

module.exports = AddTodo;
