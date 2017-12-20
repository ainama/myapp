import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Simditor from 'simditor';

import * as actions from '../actions/test';

class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var editor = new Simditor({
      //textarea的id
      textarea: $('#remark'),
      //工具条都包含哪些内容
      toolbar:['title','bold','italic','underline','table','color','ol','ul','image','hr'],
      //若需要上传功能，上传的参数设置。
      upload : {
        url : 'ImgUpload.action', //文件上传的接口地址
        params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
        fileKey: 'fileDataFileName', //服务器端获取文件数据的参数名
        connectionCount: 3,
        leaveConfirm: '正在上传文件'
       }
    });
  }

  push() {
    this.props.history.push('/page2');
  }

  addArticle() {
    this.props.history.push('/addArticle');
  }

  render() {
    return (
      <div>
        <div onClick = { () => { this.push(); } }>去page2</div>
        <div onClick = { () => { this.addArticle(); } }>去addArticle</div>
          <textarea
            id = 'remark'
            ref = 'textarea'
            placeholder = '请输入内容' />
      </div>
    );
  }
}

Page.propTypes = {

};

Page.defaultProps = {

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

export default connect(mapStateToProps, mapDispatchToProps)(Page);
