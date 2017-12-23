import * as types from '../actions/action-types';
import { myFetch } from '../../tools';

export function getUserInfo() {
  return (dispatch) => {
    let url = '/api/community/user/userInfo';
    let fetchObj = { method: 'get', credentials: 'include'};
    let outputObj = { type: types.GET_USER_INFO };
    myFetch(url, fetchObj, outputObj, dispatch);
  };
}

export function getArticles() {
  return (dispatch) => {
    let url = '/api/community/user/articles';
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