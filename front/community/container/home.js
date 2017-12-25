import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions/home';
import RecentList from '../component/home/recentList';
import LoadButton from '../component/home/loadButton';
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

  getMore() {
    let len = this.props.home.recentList.length;
    let page = Math.round(len/10) + 1;
    this.props.actions.setLoadText();
    this.props.actions.getArticleRecent('page='+page);
  }

  componentWillUnmount() {
    this.props.actions.clearProps();
  }

  render() {
    return (
      <div className = 'home-page'>

        {/* 最近文章 */}
        <div className = 'recent'>
          {/* 最近文章列表 */}
          <RecentList data = { this.props.home.recentList } />
          {/* 加载更多按钮 */}
          {
            this.props.home.status == 2 &&
            <LoadButton
              text = { this.props.home.loadText }
              click = { () => { this.getMore(); } } />
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
