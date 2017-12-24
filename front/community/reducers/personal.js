import assign from 'lodash.assign';
import * as types from '../actions/action-types';

const defaultState = {
	userInfo: {
		msg: {
			name: '',
			tel: '',
			head_img: '/images/userImg.png'
		}
	},
	articles: { msg: [] },
	likes: { msg: [] },
}

export function userInfo(state = defaultState.userInfo, action) {
  switch (action.type) {
  	case types.GET_USER_INFO: {
  		let stateObj = {};
      if (action.payload.code == 10000) {
        stateObj = { status: 2, msg: action.payload.msg[0] };
      } else if (action.payload.code == 10008) {
        stateObj = { status: 1 };
        location.href = '/login';
      }
      return assign({}, state, stateObj);
    }

    default: {
      return state;
    }
  }
}

export function userArticles(state = defaultState.articles, action) {
  switch (action.type) {
  	case types.GET_USER_ARTICLES: {
  		let stateObj = {};
      if (action.payload.code == 10000) {
        stateObj = { status: 2, msg: action.payload.msg };
      } else if (action.payload.code == 10008) {
        stateObj = { status: 1 };
      }
      return assign({}, state, stateObj);
    }

    default: {
      return state;
    }
  }
}

export function userLikes(state = defaultState.likes, action) {
  switch (action.type) {
  	case types.GET_USER_LIKES: {
  		let stateObj = {};
      if (action.payload.code == 10000) {
        stateObj = { status: 2, msg: action.payload.msg };
      } else if (action.payload.code == 10008) {
        stateObj = { status: 1 };
      }
      return assign({}, state, stateObj);
    }

    default: {
      return state;
    }
  }
}