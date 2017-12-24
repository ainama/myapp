import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions/home';
import { dateFormat } from '../../tools';
import HotList from '../component/home/hotList';
import Advert from '../component/home/advert';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advert: { src: '/images/community/home_advert.png', href: 'https://www.audi.cn/cn/web/zh.html' }
    };
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
    let len = this.props.home.recentList.length;
    let page = Math.round(len/10) + 1;
    this.props.actions.getArticleRecent('page='+page);
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
                <div key = { index }>
                  <div className = 'item'>
                    <div className = 'user'>
                      <img className = 'head' src = { head } />
                      <div className = 'name'>{ item.name }</div>
                      <div className = 'time'>{ time }</div>
                    </div>
                    <div className = 'article'>
                      <div className = 'left'>
                        <Link to = { '/community/showArticle/' + item.id }>
                          <div className = 'title'>{ item.title }</div>
                        </Link>
                        <div className = 'content'>{ tagString }</div>
                      </div>
                      <Link to = { '/community/showArticle/' + item.id }>
                        <img className = 'right banner' src = { item.banner } />
                      </Link>
                    </div>
                  </div>
                </div>
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
          {/* 热门文章列表 */}
          <HotList data = { this.props.home.hotList } />
          {/* 广告位 */}
          <Advert data = { this.state.advert } />
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
