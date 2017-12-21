import React from 'react';
import PropTypes from 'prop-types';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this._statusClick = this._statusClick.bind(this);
    this.state = {
      active: 'login'
    }
  }

  componentWillMount() {

    // 登录接口
    // $.ajax({
    //   url: '/api/user/login',
    //   type: 'post',
    //   data: {tel: '13325412542', pwd: '12345678'},
    //   success: function(res) {
    //     console.log('00000', res);
    //   }
    // });

    // // 注册接口
    // $.ajax({
    //   url: '/api/user/register',
    //   type: 'post',
    //   data: {name: 'hello', tel: '13325412543', pwd: '12345678'},
    //   success: function(res) {
    //     console.log('00000', res);
    //   }
    // });


    // 获取用户信息
    $.ajax({
      url: '/api/user/userInfo',
      type: 'get',
      data: {id: 8},
      success: function(res) {
        console.log('00000', res);
      }
    });
    
  }


  _statusClick(e, type) {
    this.setState({
      active: type
    })
  }

  render() {
    return (
      <div className = 'index-login'>
        <div className = 'index-login-body'>
          <div className = 'index-login-header'>
            <h1>蛙鸣社区</h1>
            <h2>有话你就说！说错话不要钱的亲民社区！</h2>
          </div>
          <div className = 'index-login-box'>
            <div className = 'index-login-tabs'>
              <a
                href = '#login'
                className = { this.state.active == 'login' ? 'active' : ''}
                onClick = {e => this._statusClick(e, 'login')}>登录</a>
              <a
                href = '#register'
                className = { this.state.active == 'register' ? 'active' : ''}
                onClick = {e => this._statusClick(e, 'register')}>注册</a>
            </div>

            {/*登录表单 && 注册表单*/}
            {
              this.state.active == 'login'
              ? <div className = 'index-login-login'>
                  <div className = 'input-cell-group'>
                    <input className = 'input-cell' placeholder = '手机号'/>
                    <input className = 'input-cell' placeholder = '密码' type = 'password'/>
                  </div>
                  <div className = 'index-login-button'>登录</div>
                </div>
              : <div className = 'index-login-register'>
                  <div className = 'input-cell-group'>
                    <input className = 'input-cell' placeholder = '姓名'/>
                    <input className = 'input-cell' placeholder = '手机号'/>
                    <input
                      className = 'input-cell'
                      placeholder = '密码(不少于8位)'
                      type = 'password'/>
                  </div>
                  <div className = 'index-login-button'>注册</div>
                </div>
            }
  
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Login;
