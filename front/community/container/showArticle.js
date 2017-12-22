import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/test';

class ShowArticle extends React.Component {
  constructor(props) {
    super(props);
    this._getInfo = this._getInfo.bind(this);
    this._getLike = this._getLike.bind(this);
    this._addLike = this._addLike.bind(this);
    this._goEdit = this._goEdit.bind(this);
    this.state = {
      data: {},
      status: false,  // 当前登录用户与页面文章作者id
    };
  }

  componentDidMount() {
    let article_id = this.props.match.params.article;
    this._getInfo(article_id);
    this._getLike();
  }

  _getInfo(id) {
    console.log('getInfo', id);
    //ajax 获取data
    $.ajax({
      url: '/api/community/article/read',
      type: 'POST',
      data: { id: id },
      success: function(res) {
        console.log(res.msg);
        // dispatch(addImage(res.newPath));
        // console.log(res);
        // if (res.code == 10000) {
        //   dispatch(addImage(res.newPath));
        // } else {
        //   alert(res.msg);
        // }
      }
    });
    const data = {
      user_id: 'lynn',
      update_time: '2天前',
      banner: '../images/banner.jpeg',
      title: '蛙鸣社区的第一篇文章标题',
      content: '文章内容，假装很长，特别特别长'
    };

    // let user = localStorage.getItem('user');
    let user = 'lynn';
    if (user == data.user_id) {
      this.setState({
        data: data,
        status: true,
      })
    } else {
      this.setState({
        data: data,
        status: false,
      })
    }
  }

  _getLike() {
    //ajax 获取like
    let like = 8;
    this.setState({
      like: like
    })
  }

  _addLike() {
    this.setState({
      like: ++ this.state.like
    })
  }

  _goEdit() {
    this.props.history.push('/community/addArticle');
  }

  render() {

    const {
      data,
      status,
      like
    } = this.state;

    return (
      <div className = 'showArticle-layout'>

        {/*banner&title*/}
        <div className = 'showArticle-show'>

          {/*bg*/}
          <img
            src = { data.banner }
            className = 'showArticle-banner'/>

          {/*title*/}
          <div className = 'showArticle-title'>{ data.title }</div>

          {/*info*/}
          <div className = 'showArticle-info'>
            { data.user_id } . { data.update_time }
          </div>

        </div>

        {/*content*/}
        <div className = 'showArticle-content'>
          { data.content }
        </div>

        {/*footer*/}
        <div className = 'showArticle-footer'>

          {/*like*/}
          <div className = 'showArticle-like' onClick = { this._addLike }>
            点赞{ like }
          </div>

          {/*eidt*/}
          {
            status &&
            <div className = 'showArticle-edit' onClick = { this._goEdit }>
              评论
            </div>
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
    test: store.test
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowArticle);
