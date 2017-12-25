import React from 'react';
import { Link } from 'react-router-dom';

import { dateFormat } from '../../../tools';

class RecentItem extends React.Component {
  constructor(props) {
    super(props);
  }

  tagString(content) {
    let div = document.createElement('div');
    div.innerHTML = content;
    let tagArray = div.getElementsByTagName('p');
    let tagString = '';
    for (let i = 0; i < tagArray.length; i++) {
      tagString = tagString + tagArray[i].innerHTML;
    }
    tagString = tagString.substring(0, 84);
    if (tagString.length > 83) tagString = tagString + '...';
    return tagString;
  }

  render() {
    let data = this.props.data;
    let head = data.head_img != null ? data.head_img : '/images/community/header_default_avatar.png';
    let tagString = this.tagString(data.content);
    let time = dateFormat(new Date(data.create_time).getTime());
    return (
      <div className = 'item'>
        {/* User */}
        <div className = 'user'>
          <img className = 'head' src = { head } />
          <div className = 'name'>{ data.name }</div>
          <div className = 'time'>{ time }</div>
        </div>
        {/* Article */}
        <div className = 'article'>
          <div className = 'left'>
            <Link to = { '/community/showArticle/' + data.id }>
              <div className = 'title'>{ data.title }</div>
            </Link>
            <div className = 'content'>{ tagString }</div>
          </div>
          <Link to = { '/community/showArticle/' + data.id }>
            <img className = 'right banner' src = { data.banner } />
          </Link>
        </div>
      </div>
    );
  }
}

module.exports = RecentItem;
