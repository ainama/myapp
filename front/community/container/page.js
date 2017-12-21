import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/test';

class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
  }

  push() {
    this.props.history.push('/community/page2');
  }

  render() {
    return (
      <div>
        <div onClick = { () => { this.push(); } }>去page2</div>
      </div>
    );
  }
}

Page.propTypes = {

};

Page.defaultProps = {

};

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

export default connect(mapStateToProps, mapDispatchToProps)(Page);
