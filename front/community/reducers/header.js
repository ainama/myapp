import assign from 'lodash.assign';
import * as types from '../actions/action-types';

// status 0 请求中，1请求结束
const defaultStatus = {
  status: 0
};

export function header(state = defaultStatus, action) {
  switch (action.type) {
    case types.GET_USER_BASE: {
      console.log('reducers action', action);
      return assign({ }, state, action.payload);
    }

    default: {
      return state;
    }
  }
}
