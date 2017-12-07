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
    return (
      <li className = 'todo-item'>
        <div
          className = { icon }
          onClick = { () => { this.props.onClick(); } }></div>
        <div className = 'item-text'>{ this.props.todo }</div>
      </li>
    );
  }
}

TodoItem.propTypes = {

};

TodoItem.defaultProps = {

};

module.exports = TodoItem;
