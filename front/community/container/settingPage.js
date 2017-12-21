import React from 'react';
import PropTypes from 'prop-types';


class SettingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

    // 获取用户信息
    $.ajax({
      url: '/api/community/logout',
      type: 'get',
      success: function(res) {
        console.log('00000', res);
      }
    });

    // 注册接口
    // $.ajax({
    //   url: '/api/community/user/register',
    //   type: 'post',
    //   data: {name: 'hello', tel: '13325412543', pwd: '12345678'},
    //   success: function(res) {
    //     console.log('00000', res);
    //   }
    // });
  }

  _saveInfo() {
    this.props.history.push('/community/personal');
  }

  render() {
    return (
      <div className = 'setting-page'>
          <div className = 'setting-page-div'>
            <span>姓名</span>
            <input defaultValue = 'hello' className = 'setting-input'/>
          </div>
          <div className = 'setting-page-div'>
            <span>电话</span>
            <input defaultValue = '133255256523' className = 'setting-input'/>
          </div>
          <div className = 'setting-page-div'>
            <span>头像</span>
            <input className = 'setting-image' type = 'file'/>
          </div>
          <div
            className = 'setting-page-btn'
            onClick = {() => this._saveInfo()}>保存</div>
      </div>
    );
  }
}

module.exports = SettingPage;