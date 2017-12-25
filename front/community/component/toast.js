/**
 * @description
 * @author lichaoqun Create time 2017-12-25
 */

import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash.assign';

class Toast extends React.Component {
  constructor(props) {
    super(props);
    this._closeToast = this._closeToast.bind(this);
    this._getToastStyle = this._getToastStyle.bind(this);
    this.state = {
      duration: props.duration || 3000,
      show: props.show
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show == false) {
      this.setState({ show: false });
    } else if (nextProps.show == true) {
      this.setState({ show: true });
      this._closeToast();
    }
  }

  // Toast消失方法 延时器同步动画时间
  _closeToast() {
    const duration = this.state.duration;
    this.timer = setTimeout(() => {
      this.setState({ show: false });
      clearTimeout(this.timer);
      if (this.props.closeCallback) { this.props.closeCallback(); }
    }, duration);
  }

  // Toast出现判断 动画时间同步消失时间
  _getToastStyle() {
    return {
      display: this.state.show ? 'flex' : 'none',
      animationDuration: this.state.duration / 980 + 's',
    };
  }

  render() {
    return (
      <div
        className = 'toast-warpper'
        style = { this._getToastStyle() }>
        { this.props.text }
      </div>
    );
  }
}

const styles = {};

Toast.propTypes = {
  text: PropTypes.string,         // 文案
  show: PropTypes.bool,           // Toast显示判断
  duration: PropTypes.number,     // Toast消失时间
  closeCallback: PropTypes.func,  // Toast关闭时的回调函数
};

Toast.defaultProps = {

};

module.exports = Toast;
