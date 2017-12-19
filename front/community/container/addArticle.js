import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Simditor from 'simditor';
// import 'simditor/styles/simditor.css';
// import $ from 'jquery';

import * as actions from '../actions/test';

class AddArticle extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  componentDidMount() {
    //var editor = new Simditor({ textarea:$('#Editor')});

    const toolbar = [
      'title', 'bold', 'italic','underline', 'strikethrough',
      'color','', 'ol', 'ul', 'blockquote', 'code', 'table', '',
      'link','image', 'hr', '', 'indent', 'outdent'];//设置工具栏

     // var editor = new Simditor({
     //   textarea:$('#Editor'),
     //   placeholder: '这里输入内容...',
     //   toolbar:toolbar,  //工具栏
     //   defaultImage: '/Content/SimDetor/images/image.png',//编辑器插入图片时使用的默认图片
     //   upload:{
     //     url: 'Api/UploadImg.ashx',//文件上传的接口地址
     //     params: null,//键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
     //     fileKey: 'fileDataFileName',//服务器端获取文件数据的参数名
     //     connectionCount: 3,
     //     leaveConfirm: '正在上传文件'
     //   },
     // });

  }

  setZ() {
    this.props.actions.testfunc();
  }

  render() {
    return (
      <div className = 'addArticle-layout'>

        {/*banner*/}
        <div>
          <input
            type = 'file'
            className = 'addArticle-banner'
            name = 'upload_file'
            accept = '.jpeg, .jpg, .png'/>
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
