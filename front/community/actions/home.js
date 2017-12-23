import * as types from '../actions/action-types';
import { myFetch } from '../../tools';

export function getArticleRecent(data) {
  return (dispatch) => {
    let url = '/api/community/article/recent?' + data;
    let fetchObj = { method: 'get' };
    let outputObj = { type: types.GET_ARTICLE_RECENT };
    myFetch(url, fetchObj, outputObj, dispatch);
  };
}

export function getArticleHot() {
  return (dispatch) => {
    let url = '/api/community/article/hot';
    let fetchObj = { method: 'get' };
    let outputObj = { type: types.GET_ARTICLE_HOT };
    myFetch(url, fetchObj, outputObj, dispatch);
  };
}
