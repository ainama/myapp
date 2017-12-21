import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/article';

import SimditorTextarea from '../component/addArticle/simditorTextarea.js';
import UploadImg from '../component/addArticle/uploadImg.js';

class AddArticle extends React.Component {
  constructor(props) {
    super(props);
    this._getInfo = this._getInfo.bind(this);
    this._addBanner = this._addBanner.bind(this);
    this._getContent = this._getContent.bind(this);
    this._uploadImage = this._uploadImage.bind(this);
    this._upload = this._upload.bind(this);
    // console.log(this.props);
    this.state = {
      value: this.props.article.content,
      title: this.props.article.title
    };
  }

  componentDidMount() {
    this._getInfo();
  }

  _getInfo() {
    //ajax 获取data
    // const data = {
    //   user_id: 'lynn',
    //   update_time: '2天前',
    //   banner: '../images/banner.jpeg',
    //   title: '蛙鸣社区的第一篇文章标题',
    //   content: '文章内容，假装很长，特别特别长'
    // };
  }

  // setZ() {
  //   this.props.actions.testfunc();
  // }

  _addBanner() {
    this.refs.file.click();
  }

  _getTitle(e) {
    // console.log('getTitle => ', e.target.value);
    this.setState({title: e.target.value})
  }

  _getContent(e) {
    // console.log('getContent => ', e);
    this.setState({value: e})
  }

  _uploadImage(data) {
    // console.log('uploadImage => ', data.get('image'));
    this.props.actions.uploadImage(data);
  }

  _deleteImage() {
    // console.log('deleteImage => ', this.props.article.imgUrl);
  }

  _upload() {
    const { article } = this.props;
    const { title, value } = this.state;

    let data = {
      title: title,
      user_id: 12,
      content: value,
      banner: article.imgUrl,
    };

    // console.log('upload', data);
    this.props.actions.uploadArticle(data);
  }

  render() {

    const { article } = this.props;

    return (
      <div className = 'addArticle-layout'>

        {/*banner*/}
        <div className = 'fake-wrapper'>
          <UploadImg
            upload = { (data) => { this._uploadImage(data); } }
            imageUrl = { article.imgUrl }
            delete = { () => { this._deleteImage(); } } />
        </div>

        {/*title*/}
        <div className = 'addArticle-title'>
          <input
            value = { this.state.title }
            onChange = { (e) => {this._getTitle(e); } }
            className = 'addArticle-input'
            placeholder = '请输入标题'/>
        </div>

        {/*content*/}
        <div>
          <SimditorTextarea
            id = "content"
            value = { this.state.value }
            onChange = { (e) => {this._getContent(e); } }
            placeholder = '请开始你的表演'/>
        </div>

        {/*upload*/}
        <button
          onClick = { this._upload }
          className = 'addArticle-upload'>
          发布
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
