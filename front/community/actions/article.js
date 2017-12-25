/**
 * @description
 * @author lichaoqun Create time 2017-12-21
 */

 // import axios from 'axios';
 import $ from 'jquery';

 import * as types from './action-types';

// 文章add/edit页图片上传
export function uploadImage(data) {
 return (dispatch) => {
   $.ajax({
     url: '/api/community/uploadImg',
     type: 'POST',
     timeout: 5000,
     data: data,
     contentType: false,
     processData: false,
     success: function(res) {
       dispatch(addImage(res.newPath));
       // console.log(res);
       // if (res.code == 10000) {
       //   dispatch(addImage(res.newPath));
       // } else {
       //   alert(res.msg);
       // }
     }
   });
 };
}

// 图片上传后显示图片
export function addImage(data) {
 return {
   type: types.ADD_ARTICLE_IMG,
   payload: data
 };
}

// 发布文章
export function uploadArticle(data) {
 return (dispatch) => {
   $.ajax({
     url: '/api/community/article/upload',
     type: 'POST',
     data: data,
     success: function(res) {
       console.log('uploadArticle action => ', res);
     }
   });
 };
}

// 获取文章详情
export function getArticle(id) {
 return (dispatch) => {
   $.ajax({
     url: '/api/community/article/read',
     type: 'POST',
     data: { id: id },
     success: function(res) {
       // console.log('getArticle action => ', res.msg[0]);
       dispatch(showArticle(res.msg[0]));  // 展示文章信息
     }
   });
 };
}

// 展示文章详情
export function showArticle(data) {
  return {
    type: types.SHOW_ARTICLE,
    payload: data
  };
}

// 获取文章详情
export function getLike(id) {
 return (dispatch) => {
   $.ajax({
     url: '/api/community/article/getlike',
     type: 'POST',
     data: { id: id },
     success: function(res) {
       // console.log('getLike action => ', res.like[0]);
       dispatch(showLike(res.like[0]));  // 展示文章like
     }
   });
 };
}

// 展示文章like
export function showLike(data) {
  return {
    type: types.SHOW_LIKE,
    payload: data
  };
}

// 获取文章详情
export function editLike(data) {
 return (dispatch) => {
   $.ajax({
     url: '/api/community/article/like',
     type: 'POST',
     data: data,
     success: function(res) {
       // console.log('editLike action => ', res);
     }
   });
 };
}

// 获取作者信息
export function getAuthorInfo(id) {
 return (dispatch) => {
   $.ajax({
     url: '/api/community/article/author',
     type: 'POST',
     data: { id: id },
     success: function(res) {
       // console.log('getAuthorInfo action => ', res.msg[0]);
       dispatch(showAuthorInfo(res.msg[0]));  // 展示文章like
     }
   });
 };
}

// 展示作者信息
export function showAuthorInfo(data) {
  return {
    type: types.SHOW_AUTHOR_INFO,
    payload: data
  };
}

// 获取LatestArticle
export function getLatestArticle(id) {
 return (dispatch) => {
   $.ajax({
     url: '/api/community/article/latest',
     type: 'POST',
     data: { id: id },
     success: function(res) {
       // console.log('getLatestArticle action => ', res.msg[0]);
       dispatch(showLatestArticle(res.msg[0]));  // 展示文章like
     }
   });
 };
}

// 展示LatestArticle
export function showLatestArticle(data) {
  return {
    type: types.SHOW_LATEST_AETICLE,
    payload: data
  };
}
