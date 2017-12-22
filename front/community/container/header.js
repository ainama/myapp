import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions/header';

class Header extends React.Component {
  constructor(props) {
    super(props);
    // expandStatus expand状态，false收起，true展开
    this.state = {
      expandStatus: false
    };
  }

  componentDidMount() {
    this.props.actions.getUserBase();
  }

  logout() {
    this.props.actions.logout();
  }

  expand() {
    this.setState({
      expandStatus: !this.state.expandStatus
    });
  }

  putAway() {
    this.setState({
      expandStatus: false
    });
  }

  render() {
    return (
      <div className = 'header'>
        <div className = 'body'>

          {/* logo */}
          <Link
            className = 'logo'
            to = '/community/home'
            onClick = { () => { this.putAway(); } } />

          {/* 预留区 */}
          <div className = 'group'>
            <Link
              to = '/community/home'
              onClick = { () => { this.putAway(); } }>
              <div className = 'home'>首页</div>
            </Link>
          </div>

          {/* 写文章 */}
          {
            this.props.header.status != 0 &&
            <Link
              className = 'write'
              to = '/community/addArticle'
              onClick = { () => { this.putAway(); } }>
              <div className = 'icon'></div>
              <span>写文章</span>
            </Link>
          }

          {/* 登录相关 */}
          <div className = 'user'>
            {
              this.props.header.status == 1 &&
              <React.Fragment>
                <a href = '/login'>
                  <div className = 'logon'>登录</div>
                </a>
                <a href = '/login'>
                  <div className = 'register'>注册</div>
                </a>
              </React.Fragment>
            }
            {
              this.props.header.status == 2 &&
              <React.Fragment>
                <img
                  className = 'img'
                  src = {
                    this.props.header.user.head_img != null
                    ? this.props.header.user.head_img
                    : '/images/community/header_default_avatar.png'
                  }
                  onClick = { () => { this.expand(); } } />
              </React.Fragment>
            }

            {
              this.state.expandStatus &&
              <div className = 'expand'>
                <Link
                  to = '/community/personal'
                  onClick = { () => { this.putAway(); } }>
                  <div className = 'item'>我的主页</div>
                </Link>
                <Link
                  to = '/community/setting'
                  onClick = { () => { this.putAway(); } }>
                  <div className = 'item'>设置</div>
                </Link>
                <a
                  href = '/login'
                  onClick = { () => { this.logout(); } }>
                  <div className = 'item'>退出</div>
                </a>

              </div>
            }

          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    header: store.header
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
