import * as types from '../actions/action-types';
import { myFetch } from '../../tools';

export function getArticleList() {
  return (dispatch) => {
    let url = '/api/community/article/list';
    let fetchObj = { method: 'get' };
    let outputObj = { type: types.GET_ARTICLE_LIST };
    myFetch(url, fetchObj, outputObj, dispatch);
  };
}
