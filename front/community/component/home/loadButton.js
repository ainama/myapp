import React from 'react';

class LoadButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className = 'load'
        onClick = { () => { this.props.click(); } }>
        { this.props.text }
      </div>
    );
  }
}

module.exports = LoadButton;
