import React from 'react';
import PropTypes from 'prop-types';


class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className = { this.props.className }
        onClick = { () => { this.props.onClick(); } }>
        <span>{ this.props.text }</span>
      </div>
    );
  }
}

module.exports = Button;
