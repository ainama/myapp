import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions/home';
import { dateFormat } from '../../tools';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getArticleRecent('page=1');
    this.props.actions.getArticleHot();
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

  getMore() {
    this.props.actions.getArticleRecent('page=2');
  }

  render() {
    return (
      <div className = 'home-page'>

        {/* 最近文章 */}
        <div className = 'recent'>
          {
            this.props.home.recentList.map((item, index) => {
              let head = item.head_img != null ? item.head_img : '/images/community/header_default_avatar.png';
              let tagString = this.tagString(item.content);
              let time = dateFormat(new Date(item.create_time).getTime());
              return (
                <Link key = { index } to = { '/community/showArticle/' + item.id }>
                  <div className = 'item'>
                    <div className = 'user'>
                      <img className = 'head' src = { head } />
                      <div className = 'name'>{ item.name }</div>
                      <div className = 'time'>{ time }</div>
                    </div>
                    <div className = 'article'>
                      <div className = 'left'>
                        <div className = 'title'>{ item.title }</div>
                        <div className = 'content'>{ tagString }</div>
                      </div>
                      <img
                        className = 'right banner'
                        src = { item.banner } />
                    </div>
                  </div>
                </Link>
              );
            })
          }
          {
            this.props.home.status == 2 &&
            <div
              ref = 'load'
              className = 'load'
              onClick = { () => { this.getMore(); } }>
              { this.props.home.loadText }
            </div>
          }
        </div>

        {/* 热门文章 */}
        <div className = 'hot'>
          right
        </div>

      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    home: store.home
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
