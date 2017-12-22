import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/home';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getArticleList();
  }

  render() {
    console.log(this.props.home);
    return (
      <React.Fragment>

        {/* 最近文章 */}
        <div>
          left
        </div>

        {/* 热门文章 */}
        <div>right</div>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    home: store.home
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
