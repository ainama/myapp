import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/article';

import SimditorTextarea from '../component/addArticle/simditorTextarea.js';
import UploadImg from '../component/addArticle/uploadImg.js';

class AddArticle extends React.Component {
  constructor(props) {
    super(props);
    this._addBanner = this._addBanner.bind(this);
    this._getContent = this._getContent.bind(this);
    this._uploadImage = this._uploadImage.bind(this);
    this._upload = this._upload.bind(this);
    // console.log(this.props);
    this.state = {
      content: this.props.article.content,
      title: this.props.article.title,
      article_id: this.props.match.params.article || 0
    };
  }

  componentDidMount() {
    // if()
  }

  _addBanner() {
    this.refs.file.click();
  }

  _getTitle(e) {
    // console.log('getTitle => ', e.target.value);
    this.setState({title: e.target.value})
  }

  _getContent(e) {
    // console.log('getContent => ', e);
    this.setState({content: e})
  }

  _uploadImage(data) {
    // console.log('uploadImage => ', data.get('image'));
    this.props.actions.uploadImage(data);
  }

  _deleteImage() {
    // console.log('deleteImage => ', this.props.article.banner);
  }

  _upload() {
    let user_id = this.props.header.user.id;
    // console.log('header', this.props.header.user.id);
    const { article } = this.props;

    let data = {
      id: article.article_id,
      title: this.state.title,
      author_id: user_id,
      content: this.state.content,
      banner: article.banner,
      create_time: '',
      // update_time: ''
    };
    this.props.actions.uploadArticle(data);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.article.id) {
      // console.log('componentWillRecieveProps', nextProps.article.id)
      this.props.history.push('/community/showArticle/' + nextProps.article.id);
    }
  }

  render() {

    const { article } = this.props;
    const { title, content, article_id } = this.state;

    return (
      <div className = 'addArticle-layout'>

        {/*banner*/}
        <div className = 'fake-wrapper'>
          <UploadImg
            upload = { (data) => { this._uploadImage(data); } }
            imageUrl = { article.banner }
            delete = { () => { this._deleteImage(); } } />
        </div>

        {/*title*/}
        <div className = 'addArticle-title'>
          <input
            value = { title }
            onChange = { (e) => {this._getTitle(e); } }
            className = 'addArticle-input'
            placeholder = '请输入标题'/>
        </div>

        {/*content*/}
        <div>
          <SimditorTextarea
            id = "content"
            value = { content }
            onChange = { (e) => {this._getContent(e); } }
            placeholder = '请开始你的表演'/>
        </div>

        {/*upload*/}
        <button
          onClick = { this._upload }
          className = 'addArticle-upload'>
          {
            article_id == 0
            ? '发布'
            : '更新'
          }
        </button>

      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
