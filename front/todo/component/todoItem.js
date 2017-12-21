import React from 'react';
import PropTypes from 'prop-types';


class TodoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    let icon = this.props.status == 0 ? 'item-icon-undone' : 'item-icon-completed';
    let text = this.props.status == 0 ? 'item-text-undone' : 'item-text-completed';
    return (
      <li className = 'todo-item'>
        <div
          className = { icon }
          onClick = { () => { this.props.onClick(); } }></div>
        <div className = { text }>{ this.props.todo }</div>
      </li>
    );
  }
}

TodoItem.propTypes = {

};

TodoItem.defaultProps = {

};

module.exports = TodoItem;
