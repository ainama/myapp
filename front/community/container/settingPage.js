import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/personal';

import Toast from '../component/toast.js';

class SettingPage extends React.Component {
  constructor(props) {
    super(props);
    this._uploadImg = this._uploadImg.bind(this);
    this._closeToast = this._closeToast.bind(this);
    this.state = {
      update: 'pwd',
      show: false,
      text: '',
    }
  }

  componentWillMount() {
    // 获取用户信息
    this.props.actions.getUserInfo();
  }

  _saveInfo() {
    this.props.history.push('/community/personal');
  }

  _nameBlur(e) {
    let that = this;
    let value = e.target.value;
    if (value.length != 0) {

      $.ajax({
        url: '/api/community/user/updateName',
        type: 'post',
        data: { name: value },
        success: function(res) {
          // alert(res.msg);
          that.setState({
            show: true,
            text: res.msg
          })
        }
      });
    }
  }

  // 修改用户密码或手机号
  _updateMsg(type) {
    this.setState({
      update: type
    })
    document.getElementsByClassName('page-setting-mask')[0].style.display = 'flex';
  }

  // 关闭修改弹层
  _closeBox() {
    document.getElementsByClassName('page-setting-mask')[0].style.display = 'none';
  }

  // 修改用户密码或手机号
  _updateSubmit(type) {
    let that = this;
    if (type == 'pwd') {
      let userPwd = this.props.userInfo.pwd;
      let original = $('#original').val();
      let newPwd = $('#newPwd').val();
      let reNewPwd = $('#reNewPwd').val();
      let reg = /^[0-9A-Za-z]{8,16}$/;
      let bool = reg.test(reNewPwd);

      if (userPwd != original) {
        // alert('原密码错误');
        that.setState({
          show: true,
          text: '原密码错误'
        })

        $('#original').val('');
      } else if (newPwd != reNewPwd) {
        // alert('新密码输入不一致！');
        that.setState({
          show: true,
          text: '新密码输入不一致！'
        })
        $('#newPwd').val('');
        $('#reNewPwd').val('');
      } else if (!bool) {
        // alert('请输入8-16位密码');
        that.setState({
          show: true,
          text: '请输入8-16位密码'
        })
        $('#newPwd').val('');
        $('#reNewPwd').val('');
      } else {
        $.ajax({
          url: '/api/community/user/updatePwd',
          type: 'post',
          data: { pwd: reNewPwd },
          success: function(res) {
            // alert(res.msg);
            that.setState({
              show: true,
              text: res.msg
            })
            $('#original').val('');
            $('#newPwd').val('');
            $('#reNewPwd').val('');
            document.getElementsByClassName('page-setting-mask')[0].style.display = 'none';
          }
        });
      }

    } else if (type == 'tel') {
      let newTel = $('#newTel').val();
      let reg = /^1[3|4|5|7|8][0-9]{9}$/;
      let bool = reg.test(newTel);
      if (!bool) {
        // alert('手机格式不对，请重新输入！');
        that.setState({
          show: true,
          text: '手机格式不对，请重新输入'
        })
        $('#newTel').val('');
      } else {
        $.ajax({
          url: '/api/community/user/updateTel',
          type: 'post',
          data: { tel: newTel },
          success: function(res) {
            // alert(res.msg);
            that.setState({
              show: true,
              text: res.msg
            })
            if (res.code == 10002) {
              $('#newTel').val('');
            } else if (res.code == 10000) {
              $('#newTel').val('');
              document.getElementsByClassName('page-setting-mask')[0].style.display = 'none';
            }
            
          }
        });     
      }
    }
  }

  // 左侧导航锚点
  _anchor(e, type) {
    let list = e.target.parentNode.childNodes;
    // console.log(list);
    for (let i = 0; i < list.length; i++ ) {
      list[i].className = '';
    }
    e.target.className = 'active';
    if (type == 'safe') {
      $('.setting-content')[0].style.marginTop = '-284px';
    } else {
      $('.setting-content')[0].style.marginTop = '0px';
    }
  }

  // 上传头像
  _uploadImg(e) {
    let that = this;
    let formData = new FormData();
    formData.append('image', e.target.files[0]);

    $.ajax({
      url: '/api/community/uploadImg',
      type: 'post',
      data: formData,
      contentType: false,
      processData: false,
      success: function(res) {
        console.log('00000', res);
        $.ajax({
          url: '/api/community/user/updateImg',
          type: 'post',
          data: { head_img: res.newPath },
          success: function(response) {
            // alert('上传头像成功！');
            that.setState({
              show: true,
              text: res.msg
            })
            that.props.actions.getUserInfo();
          }
        });
      }
    });
  }

  // 关闭toast
  _closeToast() {
    this.setState({
      show: false
    })
  }

  render() {
    let { userInfo } = this.props;
    return (
      <div>
        <div className = 'setting-page'>
          <div className = 'setting-nav'>
            <p className = 'active' onClick = {e => this._anchor(e, 'base')}>基本信息</p>
            <p onClick = {e => this._anchor(e, 'safe')}>账户安全</p>
          </div>
          <div className = 'setting-content'>
            <div className = 'setting-content-detail'>
              <p className = 'setting-content-title'>基本资料</p>
              <div className = 'setting-content-base'>
                <div className = 'setting-content-img'>
                  <div className = 'mask'>
                    <div>
                      <img src = '/images/camera.png' />
                      <p>修改头像</p>
                      <input
                        className = 'upload'
                        accept = '.png,.jpg,.jpeg'
                        type = 'file'
                        name = 'image'
                        onChange = {e => this._uploadImg(e)}/>
                    </div>
                  </div>
                  <img src = { userInfo.head_img }/>
                </div>
                <div className = 'setting-content-separate'></div>
                <div className = 'setting-content-input'>
                  <p>姓名</p>
                  <input
                    defaultValue = { userInfo.name }
                    className = 'setting-input'
                    onBlur = {e => this._nameBlur(e)}/>
                </div>
              </div>
            </div>

            <div className = 'setting-content-detail'>
              <p className = 'setting-content-title'>账户安全</p>
              <div
                className = 'setting-cell'
                style = {{borderBottom: '1px solid #d5d5d5'}}>
                <p>密码</p>
                <div onClick = {() => this._updateMsg('pwd')}>修改</div>
              </div>
              <div className = 'setting-cell'>
                <p>手机号</p>
                <div onClick = {() => this._updateMsg('tel')}>设置</div>
              </div>
            </div>
          </div>
        </div>
        <div className = 'page-setting-mask'>

          { this.state.update == 'pwd'           
            ? <div className = 'setting-mask-div'>
                <div
                  className = 'close'
                  onClick = {() => this._closeBox()}>x</div>
                <span>修改密码</span>

                <p>原密码：</p>
                <input id = 'original' type = 'password' className = 'setting-input'/>
              
                <p>新密码：</p>
                <input id = 'newPwd' type = 'password' className = 'setting-input'/>
             
                <p>确认新密码：</p>
                <input id = 'reNewPwd' type = 'password' className = 'setting-input'/>

                <div
                  className = 'setting-submit'
                  onClick = {() => this._updateSubmit('pwd')}>确认</div>
              </div>
            : <div className = 'setting-mask-div'>
                <div
                  className = 'close'
                  onClick = {() => this._closeBox()}>x</div>
                <span>修改手机</span>

                <p>请输入手机号</p>
                <input id = 'newTel' className = 'setting-input'/>

                <div
                  className = 'setting-submit'
                  onClick = {() => this._updateSubmit('tel')}>确认</div>
              </div>
          }
        </div>

        {/*toast*/}
        <Toast
          show = { this.state.show }
          text = { this.state.text }
          closeCallback = { this._closeToast } />

      </div>
    );
  }
}


const mapStateToProps = (store) => {
  return {
    userInfo: store.userInfo.msg
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);