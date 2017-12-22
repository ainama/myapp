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
      type: this.props.match.params.type
    };
  }

  componentDidMount() {}

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
    const { article } = this.props;

    let data = {
      id: article.article_id,
      title: this.state.title,
      user_id: 3,
      content: this.state.content,
      banner: article.banner,
      create_time: '',
      update_time: ''
    };

    // console.log('upload', data);
    this.props.actions.uploadArticle(data);
    this.props.history.push('/community/home');
  }

  render() {

    const { article } = this.props;
    const { title, content, type } = this.state;

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
            type == 'edit'
            ? '更新'
            : '发布'
          }
        </button>

      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
