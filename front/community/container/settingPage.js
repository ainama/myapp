import React from 'react';
import PropTypes from 'prop-types';


class SettingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

    // 获取用户信息
    $.ajax({
      url: '/api/community/user/userInfo',
      type: 'get',
      data: {id: 8},
      success: function(res) {
        console.log('00000', res);
      }
    });
    
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
            <input defaultValue = '13325123652' className = 'setting-input'/>
          </div>
          <div className = 'setting-page-div'>
            <span>头像</span>
            <input className = 'setting-image' type = 'file'/>
          </div>
          <div className = 'setting-page-btn'>保存</div>
      </div>
    );
  }
}

module.exports = SettingPage;