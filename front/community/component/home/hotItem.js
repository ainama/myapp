import React from 'react';
import { Link } from 'react-router-dom';

import { dateFormat } from '../../../tools';

class HotItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    let i = this.props.index;
    let time = dateFormat(new Date(data.create_time).getTime());
    return (
      <Link className = 'item' to = { '/community/showArticle/' + data.id }>>
        <img className = 'banner' src = { data.banner } />
        <div className = 'content'>
          <span>{ data.title }</span>
          <span className = 'time'>{ time }</span>
        </div>
      </Link>
    );
  }
}

module.exports = HotItem;
