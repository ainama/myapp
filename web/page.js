import React from 'react';
// import PropTypes from 'prop-types';
// import assign from 'lodash.assign';
// import classNames from 'classnames';

import TodoList from './component/todoList.js';
import Button from './component/button.js';
import AddTodo from './component/addTodo.js';


class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completedList: [],
      undoneList: []
    };
  }

  componentDidMount() {
    this.getlist();
  }

  getlist() {
    let _this = this;
    $.ajax({
      url: '/api/todo/completed/list',
      type: 'get',
      success: function(res) {
        _this.setState({
          completedList: res.msg
        });
      }
    });

    $.ajax({
      url: '/api/todo/undone/list',
      type: 'get',
      success: function(res) {
        _this.setState({
          undoneList: res.msg
        });
      }
    });
  }

  addTodo(value) {
    let _this = this;
    $.ajax({
      url: '/api/todo/add',
      type: 'post',
      data: { todo: value },
      success: function(res) {
        _this.getlist();
      }
    });
  }

  setStatus(data) {
    let _this = this;
    $.ajax({
      url: '/api/todo/edit',
      type: 'put',
      data: { id: data.id, todo: data.todo, status: data.status == 0 ? 1 : 0 },
      success: function(res) {
        _this.getlist();
      }
    });
  }

  clear() {
    let _this = this;
    $.ajax({
      url: '/api/todo/completed/remove',
      type: 'delete',
      success: function(res) {
        _this.getlist();
      }
    });
  }

  render() {
    return (
      <div className = 'page'>

        <div className = 'page-left'>

          <h1 className = 'page-title'>我的TODO</h1>

          <TodoList
            className = 'undone-list'
            todoList = { this.state.undoneList }
            onClick = { (data) => { this.setStatus(data); } } />

          {
            (this.state.undoneList.length != 0 && this.state.completedList.length != 0) &&
            <div className = 'todo-interval'></div>
          }

          <TodoList
            className = 'completed-list'
            todoList = { this.state.completedList }
            onClick = { (data) => { this.setStatus(data); } } />

          <Button
            className = 'clear-completed'
            text = '清除已完成todo'
            onClick = { () => { this.clear(); } } />

        </div>

        <div className = 'page-right'>
          <AddTodo
            className = 'add-todo'
            onClick = { (value) => { this.addTodo(value); } } />
        </div>

      </div>
    );
  }
}

Page.propTypes = {

};

Page.defaultProps = {

};

module.exports = Page;
