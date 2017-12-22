import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions/header';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getUserBase();
  }

  render() {
    return (
      <div className = 'header'>
        <div className = 'body'>

          {/* logo */}
          <Link className = 'logo' to = '/community/home'></Link>

          {/* 预留区 */}
          <div className = 'group'>
            <Link to = '/community/home'>
              <div className = 'home'>首页</div>
            </Link>
          </div>

          {/* 写文章 */}
          {
            this.props.header.status != 0 &&
            <Link className = 'write' to = '/community/addArticle'>
              <div className = 'icon'></div>
              <span>写文章</span>
            </Link>
          }

          {/* 登录相关 */}
          <div className = 'user'>
            {
              this.props.header.status == 1 &&
              <React.Fragment>
                <div className = 'logon'>登录</div>
                <div className = 'register'>注册</div>
              </React.Fragment>
            }
            {
              this.props.header.status == 2 &&
              <React.Fragment>
                <img src = '' />
              </React.Fragment>
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
