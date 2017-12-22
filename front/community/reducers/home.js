import assign from 'lodash.assign';
import * as types from '../actions/action-types';

/**
 * 默认数据
 * @method defaultStatus
 * @param {int} status 0 请求中，1 未登录，2 已登录
 */
const defaultStatus = {
  recentList: [ ],
  hostList: [ ]
};

export function home(state = defaultStatus, action) {
  switch (action.type) {
    case types.GET_ARTICLE_RECENT: {
      let stateObj = { };
      if (action.payload.code == 10000) {
        stateObj = { recentList: action.payload.msg };
      }
      return assign({ }, state, stateObj);
    }

    case types.GET_ARTICLE_HOT: {
      let stateObj = { };
      if (action.payload.code == 10000) {
        stateObj = { hotList: action.payload.msg };
      }
      return assign({ }, state, stateObj);
    }

    default: {
      return state;
    }
  }
}
