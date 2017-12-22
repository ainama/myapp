import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/article';

class ShowArticle extends React.Component {
  constructor(props) {
    super(props);
    this._addLike = this._addLike.bind(this);
    this._goEdit = this._goEdit.bind(this);
    this.state = {
      user: 3,  // 当前登录用户与页面文章作者id
      status: false,
    };
  }

  componentDidMount() {
    let article_id = this.props.match.params.article;
    this.props.actions.getArticle(article_id);  // 获取文章信息
    this.props.actions.getLike(article_id);  // 获取文章点赞信息
  }

  _addLike() {
    this.setState({ status: true});
    let article_id = this.props.match.params.article;
    let data = {
      article_id: this.props.article.article_id,
      user_id: this.state.user
    };
    this.props.actions.editLike(data);
    this.props.actions.getLike(article_id);  // 获取文章信息
  }

  _goEdit() {
    // console.log('showArticle => ', this.props.article);
    this.props.history.push('/community/addArticle/edit');
  }

  render() {

    const article = this.props.article;
    const { user, status } = this.state;

    return (
      <div className = 'showArticle-layout'>

        {/*banner&title*/}
        <div className = 'showArticle-show'>

          {/*bg*/}
          <img
            src = { article.banner }
            className = 'showArticle-banner'/>

          {/*title*/}
          <div className = 'showArticle-title'>{ article.title }</div>

          {/*info*/}
          <div className = 'showArticle-info'>
            { article.user_id } . { article.update_time }
          </div>

        </div>

        {/*content*/}
        <div className = 'showArticle-content'>
          { article.content }
        </div>

        {/*footer*/}
        <div className = 'showArticle-footer'>

          {/*like*/}
          <button
            disabled = { status }
            className = 'showArticle-like'
            onClick = { this._addLike }>
            点赞{ article.like }
          </button>

          {/*eidt*/}
          {
            user == article.user_id &&
            <button
              className = 'showArticle-edit'
              onClick = { this._goEdit }>
              编辑
            </button>
          }

        </div>

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
    article: store.article
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowArticle);
