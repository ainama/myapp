/**
 * @description 支持中心添加列表图
 * @author lichaoqun Create time 2017-12-21
 */

import assign from 'lodash.assign';

import * as types from '../actions/action-types';

const defaultStatus = {
  article_id: 0,
  title: '',
  user_id: 0,
  content: '',
  banner: '',
  create_time: '',
  update_time: '',
  like: 0
  // isChange: false,
};

export function article(state = defaultStatus, action) {
  switch (action.type) {

    case types.ADD_ARTICLE_IMG: {
      // console.log('ADD_ARTICLE_IMG reducer => ', action.payload);
      return assign({}, state, { banner: action.payload });
    }

    case types.SHOW_ARTICLE: {
      // console.log('SHOW_ARTICLE reducer => ', action.payload);
      return assign({}, state, action.payload, { article_id: action.payload.id });
    }

    case types.SHOW_LIKE: {
      // console.log('SHOW_LIKE reducer => ', action.payload);
      return assign({}, state, { like: action.payload.count });
    }

    default:
      return state;
  }
}
