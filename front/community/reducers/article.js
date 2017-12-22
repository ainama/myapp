/**
 * @description 支持中心添加列表图
 * @author lichaoqun Create time 2017-12-21
 */

import assign from 'lodash.assign';

import * as types from '../actions/action-types';

const defaultStatus = {
  author_id: 0,
  article_id: 0,
  title: '',
  content: '',
  banner: '',
  create_time: '',
  // update_time: '',
  user_id: 0,
  like: 0,
  author_name: '',
  head_img: '',
  latest_article_id: '',
  latest_article_title: '',
  latest_article_time: ''
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

    case types.SHOW_AUTHOR_INFO: {
      // console.log('SHOW_AUTHOR_INFO reducer => ', action.payload);
      return assign({}, state, action.payload,
        { author_id: action.payload.id,  author_name: action.payload.name });
    }

    case types.SHOW_LATEST_AETICLE: {
      // console.log('SHOW_LATEST_AETICLE reducer => ', action.payload);
      return assign({}, state, {
        latest_article_id: action.payload.id,
        latest_article_title: action.payload.title,
        latest_article_time: action.payload.create_time
      });
    }

    default:
      return state;
  }
}
