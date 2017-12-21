import * as types from '../actions/action-types';

export function getUserBase() {
  console.log('This is getUserBase()');

  $.ajax({
    url: '/api/community/user/base',
    type: 'get',
    success: function(res) {
      console.log(res);
    }
  });

  return {
    type: types.GET_USER_BASE,
    payload: { status: 1 }
  };
}
