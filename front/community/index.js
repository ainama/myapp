import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions/test';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <div className = 'head'>header</div>

        <div className = 'container'>
          { this.props.children }
        </div>

        <div className = 'foot'>footer</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Index);
