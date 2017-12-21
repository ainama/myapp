/**
 * @description
 * @author lichaoqun Create time 2017-12-21
 */

 // import axios from 'axios';
 import $ from 'jquery';

 import * as types from './action-types';

 export function uploadImage(data) {
   return (dispatch) => {
     $.ajax({
       url: '/api/community/article/image',
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

 export function addImage(data) {
   return {
     type: types.ADD_ARTICLE_IMG,
     payload: data
   };
 }

 export function uploadArticle(data) {
   return (dispatch) => {
     $.ajax({
       url: '/api/community/article/upload',
       type: 'POST',
       data: data,
       success: function(res) {
         console.log(res);
         // dispatch(addImage(res.newPath));
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
