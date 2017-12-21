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
    console.log(this.props.header);
    return (
      <div className = 'header'>
        <div className = 'body'>
          <div className = 'logo'></div>
          <div className = 'group'>
            <div className = 'home'>首页</div>
          </div>
          <Link className = 'write' to = '/community/addArticle'>
            <div className = 'icon'></div>
            <span>写文章</span>
          </Link>
          <div className = 'user'>
            <div className = 'logon'>登录</div>
            <div className = 'register'>注册</div>
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
