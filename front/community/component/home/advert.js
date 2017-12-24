import React from 'react';
import { Link } from 'react-router-dom';

class HotItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    return (
      <div className = 'advert'>
        <img
          className = 'img'
          src = { data.src }
          onClick = { () => { location.href = data.href } } />
        <div className = 'text'>广告</div>
      </div>
    );
  }
}

module.exports = HotItem;
