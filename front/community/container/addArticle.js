import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/test';

import SimditorTextarea from '../component/simditorTextarea.js';
import UploadImg from '../component/uploadImg.js';

class AddArticle extends React.Component {
  constructor(props) {
    super(props);
    this._addBanner = this._addBanner.bind(this);
    this._getContent = this._getContent.bind(this);
    this._uploadImage = this._uploadImage.bind(this);
    console.log(this.props);
    this.state = {
      value: '',
      productUrl: '',
      title: ''
    };
  }

  componentDidMount() {}

  setZ() {
    this.props.actions.testfunc();
  }

  _addBanner() {
    this.refs.file.click();
  }

  _getTitle(e) {
    console.log('getTitle => ', e.target.value);
    this.setState({title: e.target.value})
  }

  _getContent(e) {
    console.log('getContent => ', e);
    // this.setState({value: e.target.value})
  }

  _uploadImage(data) {
    console.log('uploadImage => ', data.get('image'));
  }

  _deleteImage() {
    console.log('deleteImage => ', this.state.productUrl);
  }

  render() {
    return (
      <div className = 'addArticle-layout'>

        {/*banner*/}
        <div className = 'fake-wrapper'>
          <UploadImg
            upload = { (data) => { this._uploadImage(data); } }
            imageUrl = { this.state.productUrl }
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

      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
