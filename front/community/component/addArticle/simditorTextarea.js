/**
 * @description
 * @author lichaoqun Create time 2017-12-20
 */

import React from 'react';
import PropTypes from 'prop-types';
// import Simditor from "simditor";
import $ from "jquery";

// require("simditor/styles/simditor.css");

class SimditorTextarea extends React.Component {

  constructor(props) {
    super(props);
    this._initEditor = this._initEditor.bind(this);
    this._getValue = this._getValue.bind(this);
    this.state = {};
  }

  componentDidMount() {
    this._initEditor();
    // $(this.refs.textarea).onpaste = function() { return false };
    this.editor.onpaste = function() { return false };
  };

  _initEditor() {

    const _this = this;

    let config = {
      textarea: $(this.refs.textarea),
      placeholder: this.props.placeholder,
      // defaultImage: 'images/image.png',
      params: {},
      tabIndent: true,
      toolbar: [
        'title',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'fontScale',
        'color',
        'link',
        'hr',
        'image',
        'indent',
        'outdent',
        'alignment',
      ],
      upload: {
        // url: ENV.IMAGE_ACTION, //文件上传的接口地址
        params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
        fileKey: 'file', //服务器端获取文件数据的参数名
        connectionCount: 3,
        leaveConfirm: '正在上传文件',
      },
      toolbarFloat: true,
      toolbarFloatOffset: 0,
      toolbarHidden: false,
      pasteImage: false,
      cleanPaste: false,
    };

    this.editor = new Simditor(config);// 初始化编辑器
    this.editor.setValue(this.props.value || '');

    //监听改变
    this.editor.on("valuechanged", (e, src) => {
      this.props.onChange(this._getValue());
    });

    $('.simditor').on('click', function() {
      _this.editor.focus();
    });

    //更改图片上传类型
    $(".simditor input[type='file']").attr('accept', 'image/jpg,image/jpeg,image/png,image/bmp');
  };

  // componentWillReceiveProps(nextProps){
  //     this.editor.setValue(nextProps.value);
  // };

  _getValue() {
    // return this.editor._getValue().trim();
    // let selectName = `#${this.props.id}.simditor.simditor-wrapper`;
    let html = $('.simditor').find(".simditor-body").html();
    // console.log('selectName', $(selectName).find(".simditor-body").html());
    // console.log('textareaHtml => ', html);
    return html;
  };

  render() {
    return (
      <textarea
        id = { this.props.id }
        ref = 'textarea'
        placeholder = '请输入内容'/>
    );
  }
}

SimditorTextarea.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

SimditorTextarea.defaultProps = {

};

export default SimditorTextarea;
