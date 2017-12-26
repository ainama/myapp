import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/personal';

class PersonalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'article',
      articleArr: [],  // 用户发表文章列表
      likeArr: [],     // 获取用户点赞文章列表
    }
  }

  componentWillMount() {
    // 获取用户信息
    this.props.actions.getUserInfo();
    // 默认首先获取文章列表获取
    this.props.actions.getArticles();
    // $.ajax({
    //   url: '/api/community/user/userInfo',
    //   type: 'get',
    //   success: function(res) {
    //     console.log('00000', res);
    //     if (res.code == 10008) {
    //       location.href = '/login';
    //     }
    //   }
    // }); 
  }

  componentWillReceiveProps() {

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

  // 点击tab签获取相应内容列表
  _tabsChange(type) {
    this.setState({
      active: type
    })

    if (type == 'article') {
      // 获取用户发表文章列表
      this.props.actions.getArticles();
    } else if (type == 'like') {
      // 获取用户点赞文章列表
      this.props.actions.getLikes();   
    } 
  }

  render() {
    let { userInfo, userArticles, userLikes } = this.props;
    let active = this.state.active;
    let list = active == 'article' ? userArticles : userLikes;
    console.log('list', list)
    return (
      <div className = 'personal-page'>
        {/*个人资料*/}
        <div className = 'personal-info'>
          <div className = 'personal-info-box'>
            <p className = 'personal-info-name'>{ userInfo.name }</p>
            <div className = 'personal-info-detail'>
              <img src = { userInfo.head_img }/>             
              <div className = 'personal-info-msg'>
                <p>{ userInfo.tel }</p>
                <div>暂无个人简介</div>
              </div>
            </div>
          </div>
          <div className = 'personal-info-data'>
            <div className = 'personal-info-thumb'>
              <div>
                <img src = '/images/thumb_up.png'/>
                <span>好评</span>
              </div>
              <p>{ userInfo.like }</p>
            </div>
          </div>   
        </div>
        {/*个人参与的社区活动*/}
        <div className = 'personal-content'>
          <div className = 'personal-content-tabs'>
            <p
              className = { active == 'article' ? 'tabs-cell active' : 'tabs-cell'}
              onClick = {() => this._tabsChange('article')}>文章</p>
            <p
              className = { active == 'like' ? 'tabs-cell active' : 'tabs-cell'}
              onClick = {() => this._tabsChange('like')}>已赞</p>
          </div>
          <div className = 'personal-content-list'>
            { list.length
              ? list.map(function(item, k){
                let tagString = this.tagString(item.content);
                return (
                  <Link
                    key = { k }
                    className = 'item'
                    to = { '/community/showArticle/' + item.id }>
                    <div className = 'content'>
                      <div className = 'title'>{ item.title }</div>
                      <div className = 'detail'>{ tagString }</div>
                      <div className = 'like'>
                        <img
                          className = 'hot'
                          src = '/images/hot_icon.png'/><span>{ item.praise }</span>
                        <img  
                          className = 'thumb-up'
                          src = '/images/thumb_icon.png'/><span>{ item.count_like }</span>
                      </div>
                    </div>
                    <img
                      className = 'img'
                      src = { item.banner } />
                  </Link>

                )
              }.bind(this))
              : <div className = 'personal-content-none'>
                  { this.state.active == 'article'
                    ? '您很懒哦！还没有发表过文章！'
                    : '您很不够意思哦！还没有赞过文章！'}
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    userInfo: store.userInfo.msg,
    userArticles: store.userArticles.msg,
    userLikes: store.userLikes.msg,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage);
