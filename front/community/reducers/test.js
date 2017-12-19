import assign from 'lodash.assign';

const defaultStatus = {
  a: 'a',
  b: 'b',
  c: false
};

export function test(state = defaultStatus, action) {
  switch (action.type) {
    case 'TEST':
      return assign({ }, state, { });

    default:
      return state;
  }
}
