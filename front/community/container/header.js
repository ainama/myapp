import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/test';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = 'header'>
        Header
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
