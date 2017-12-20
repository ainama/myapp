import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/test';

class ShowArticle extends React.Component {
  constructor(props) {
    super(props);
    this._getInfo = this._getInfo.bind(this);
    console.log(this.props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    this._getInfo();
  }

  // setZ() {
  //   this.props.actions.testfunc();
  // }

  _getInfo() {
    console.log('_getInfo');
    //ajax 获取data
    const data = {
      user_id: 'lynn',
      update_time: '2天前',
      banner: '../images/banner.jpeg',
      title: '蛙鸣社区的第一篇文章标题',
      content: '文章内容，假装很长，特别特别长'
    };

    this.setState({
      data: data
    })

  }

  render() {

    const data = this.state.data;

    return (
      <div className = 'showArticle-layout'>

        {/*banner&title*/}
        <div className = 'showArticle-show'>

          {/*bg*/}
          <img
            src = { data.banner }
            className = 'showArticle-banner'/>

          {/*title*/}
          <div className = 'showArticle-title'>{ data.title }</div>

          {/*info*/}
          <div className = 'showArticle-info'>
            { data.user_id } . { data.update_time }
          </div>

        </div>

        {/*content*/}
        <div className = 'showArticle-content'>
          { data.content }
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowArticle);
