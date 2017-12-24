import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
            <div className = 'div' onClick = { () => { scrollTo(0, 0); } }>
              <Link to = '/community/home'>关于AINAMA</Link>
            </div>
            <div className = 'div' onClick = { () => { scrollTo(0, 0); } }>
              <Link to = '/community/home'>联系我们</Link>
            </div>
            <div className = 'div' onClick = { () => { scrollTo(0, 0); } }>
              <Link to = '/community/home'>加入我们</Link>
            </div>
          </div>
          <div className = 'row2' onClick = { () => { scrollTo(0, 0); } }>
            <Link to = '/community/home'>©2017 京ICP备16042859号</Link>
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
