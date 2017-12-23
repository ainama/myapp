import assign from 'lodash.assign';
import * as types from '../actions/action-types';

/**
 * 默认数据
 * @method defaultStatus
 * @param {int} status 0 请求中，1 不足10条不展示load，2 等于10条展示load
 */
const defaultStatus = {
  recentList: [ ],
  hostList: [ ],
  status: 0
};

export function home(state = defaultStatus, action) {
  switch (action.type) {
    case types.GET_ARTICLE_RECENT: {
      let stateObj = { };
      if (action.payload.code == 10000) {
        let list = state.recentList;
        list = list.concat(action.payload.msg);
        stateObj = {
          recentList: list,
          status: action.payload.msg.length != 10 ? 1 : 2,
          loadText: action.payload.msg.length == 10 && '阅读更多'
        };
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
