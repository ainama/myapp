import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './todoItem.js';


class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className = { this.props.className }>
        {
          this.props.todoList.map((item, i) => {
            return (
              <TodoItem
                key = { i }
                status = { item.status }
                todo = { item.todo }
                onClick = { () => { this.props.onClick(item); } } />
            );
          })
        }
      </ul>
    );
  }
}

module.exports = TodoList;
