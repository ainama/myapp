import * as types from '../actions/action-types';
import { myFetch } from '../../tools';

export function getUserInfo(uid) {
  return (dispatch) => {
    let url = '/api/community/user/userInfo?id=' + uid;
    let fetchObj = { method: 'get', credentials: 'include'};
    let outputObj = { type: types.GET_USER_INFO };
    myFetch(url, fetchObj, outputObj, dispatch);
  };
}

export function getArticles(uid) {
  return (dispatch) => {
    let url = '/api/community/user/articles?id=' + uid;
    let fetchObj = { method: 'get', credentials: 'include'};
    let outputObj = { type: types.GET_USER_ARTICLES };
    myFetch(url, fetchObj, outputObj, dispatch);
  };
}

export function getLikes() {
  return (dispatch) => {
    let url = '/api/community/user/likes';
    let fetchObj = { method: 'get', credentials: 'include'};
    let outputObj = { type: types.GET_USER_LIKES };
    myFetch(url, fetchObj, outputObj, dispatch);
  };
}