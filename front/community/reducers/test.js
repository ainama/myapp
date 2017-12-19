import assign from 'lodash.assign';
import * as types from '../actions/action-types';

const defaultStatus = {
  a: 'a',
  b: 'b',
  c: false
};

export function test(state = defaultStatus, action) {
  switch (action.type) {
    case types.TEST:
      console.log('reducers action', action);
      return assign({ }, state, action.payload);

    default:
      return state;
  }
}
