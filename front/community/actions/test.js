import * as types from '../actions/action-types';

export function testfunc() {
  console.log('This is testfunc()');
  return {
    type: types.TEST,
    payload: { z: 'z' }
  };
}
