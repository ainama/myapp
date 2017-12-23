import assign from 'lodash.assign';
import * as types from '../actions/action-types';

/**
 * 默认数据
 * @method defaultStatus
 * @param {int} status 0 请求中，1 未登录，2 已登录
 */
const defaultStatus = {
  status: 0
};

export function header(state = defaultStatus, action) {
  switch (action.type) {
    case types.GET_USER_BASE: {
      let stateObj = { };
      if (action.payload.code == 10000) {
        stateObj = { status: 2, user: action.payload.msg };
      } else if (action.payload.code == 10008) {
        stateObj = { status: 1 };
      }
      return assign({ }, state, stateObj);
    }

    default: {
      return state;
    }
  }
}
