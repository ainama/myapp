import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/test';

class Page2 extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  setZ() {
    // this.props.actions.testfunc();
    this.props.history.push('/community/login');
  }


  componentWillMount() {

    // 登录接口
    $.ajax({
      url: '/api/user/login',
      type: 'post',
      data: {tel: '13325412542', pwd: '12345678'},
      success: function(res) {
        console.log('00000', res);
      }
    });

  }

  render() {
    return (
      <div>
        <div onClick = { () => { this.setZ(); } }>actions click</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Page2);
