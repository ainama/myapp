/**
 * @description 支持中心添加列表图
 * @author lichaoqun Create time 2017-12-21
 */

import assign from 'lodash.assign';

import * as types from '../actions/action-types';

const defaultStatus = {
  imgUrl: '',
  title: '',
  content: ''
  // isChange: false,
};

export function article(state = defaultStatus, action) {
  switch (action.type) {

    case types.ADD_ARTICLE_IMG: {
      console.log('action', action.payload);
      return assign({}, state, { imgUrl: action.payload });
    }

    default:
      return state;
  }
}
