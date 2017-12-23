import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/test';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = 'footer'>
        <div className = 'body'>
          <div className = 'row1'>
            <a>关于AINAMA</a>
            <a>联系我们</a>
            <a>加入我们</a>
          </div>
          <div className = 'row2'>
            <a>©2017 京ICP备16042859号</a>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
