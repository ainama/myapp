import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/home';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getArticleRecent();
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

  render() {
    return (
      <div className = 'home-page'>

        {/* 最近文章 */}
        <div className = 'recent'>
          {
            this.props.home.recentList.map((item, index) => {
              let head = item.head_img != null ? item.head_img : '/images/community/header_default_avatar.png';
              let tagString = this.tagString(item.content);
              return (
                <div key = { index } className = 'item'>
                  <div className = 'user'>
                    <img className = 'head' src = { head } />
                    <div className = 'name'>{ item.name }</div>
                    <div>时间</div>
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
              );
            })
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
