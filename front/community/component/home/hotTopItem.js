import React from 'react';
import { Link } from 'react-router-dom';

class HotTopItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    let i = this.props.index;
    return (
      <Link
        className = 'item-top'
        to = { '/community/showArticle/' + data.id }
        style = {{ backgroundImage: 'url(' + data.banner + ')' }}>
        <div
          className = 'ranking'
          style = {{ backgroundImage: 'url(/images/community/home_hot_top_' + i + '.png)' }}>
          <div className = 'font10'>TOP{ i + 1 }</div>
        </div>
        <div className = 'blocked'>
          <span>{ data.title }</span>
        </div>
      </Link>
    );
  }
}

module.exports = HotTopItem;
