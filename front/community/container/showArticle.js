import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/article';

import Toast from '../component/toast.js';

class ShowArticle extends React.Component {
  constructor(props) {
    super(props);
    this._addLike = this._addLike.bind(this);
    this._goEdit = this._goEdit.bind(this);
    this._showLatest = this._showLatest.bind(this);
    this._createMarkup = this._createMarkup.bind(this);
    this._closeToast = this._closeToast.bind(this);
    this.state = {
      status: true,  // 是否可点赞
      show: false  // toast出现
    };
  }

  componentWillMount() {
    let article_id = this.props.match.params.article;
    this.props.actions.getArticle(article_id);  // 获取文章信息
    this.props.actions.getLike(article_id);  // 获取文章点赞信息
    this.props.actions.getAuthorInfo(article_id);  // 获取作者信息
    this.props.actions.getLatestArticle(article_id);  // 获取最新文章信息
    // console.log('componentWillMount', this.props.header.user.id)
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    // console.log('componentDidMount', this.props.header.user.id)
  }

  _addLike() {
    console.log(111)
    if(this.props.header.user) {
      this.setState({ status: false});
      let article_id = this.props.match.params.article;
      let user_id = this.props.header.user.id;
      let data = {
        article_id: this.props.article.article_id,
        user_id: user_id
      };
      this.props.actions.editLike(data);
      // this.props.actions.getLike(article_id);  // 获取文章点赞信息
    } else {
      this.setState({ show: true});
    }
  }

  _goEdit() {
    // console.log('showArticle => ', this.props.article);
    this.props.history.push('/community/addArticle/edit');
  }

  _showLatest() {
    // console.log('_showLatest => ', this.props.article.latest_article_id);
    let article_id = this.props.article.latest_article_id;
    this.props.history.push('/community/showArticle/' + article_id);
  }

  _closeToast() {
    this.setState({
      show: false
    })
  }

  // 文字转换
  _createMarkup(data) {
    return { __html: data };
  }

  render() {

    const article = this.props.article;
    const { status, show } = this.state;

    return (
      <div className = 'showArticle-layout'>

        {/*left article info*/}
        <div className = 'showArticle-left'>

          {/*title*/}
          <div className = 'showArticle-title'>{ article.title }</div>

          {/*info*/}
          <div className = 'showArticle-info'>
            { article.author_name }
            <span className = 'showArticle-time'>
              { article.create_time }
            </span>
          </div>

          {/*content*/}
          <div
            className = 'showArticle-content'
            dangerouslySetInnerHTML = { this._createMarkup(article.content) } />

          {/*like*/}
          <button
            disabled = { article.isLiked && !status }
            className = { !article.isLiked && status ?'showArticle-like' : 'showArticle-dislike' }
            onClick = { this._addLike }>
            <img src = '/images/article_thumb_up.png'/>
            {
              !article.isLiked && status
              ? `赞(${ article.like })`
              : `感谢(${ article.like })`
            }
          </button>

        </div>

        {/*right author info*/}
        <div className = 'showArticle-right'>

          {/*当前信息和最近文章*/}
          <div className = 'showArticle-curInfo'>

            {/*head_img*/}
            <img
              // src = '/images/community/header_default_avatar.png'
              src = { article.head_img }
              className = 'showArticle-headImg'/>

            {/*author info*/}
            <div className = 'showArticle-authorName'>
              { article.author_name }
            </div>
            <div  className = 'showArticle-authorInfo'>
              作者简介：此模块暂未开通，敬请期待。
            </div>

            {/*latest article*/}
            <div className = 'showArticle-latest'>
              最近文章
            </div>

            <div
              className = 'showArticle-latestTitle'
              onClick = { this._showLatest }>
              { article.latest_article_title }
            </div>

            <div className = 'showArticle-latestTime'>
              { article.latest_article_time }
            </div>

          </div>
        </div>

        {/*toast*/}
        <Toast
          show = { show }
          text = '请您登陆'
          closeCallback = { this._closeToast } />


        {/*eidt  暂时关闭编辑接口*/}
        {
          // this.props.header.user.id == article.author_id &&
          // <button
          //   className = 'showArticle-edit'
          //   onClick = { this._goEdit }>
          //   编辑
          // </button>
        }
      </div>
    );
  }
}

ShowArticle.propTypes = {
  params: PropTypes.object,
};

const mapStateToProps = (store) => {
  return {
    test: store.test,
    article: store.article,
    header: store.header
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowArticle);
