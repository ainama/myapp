import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { test } from './test';

const rootReducer = combineReducers({
  test
});

export default rootReducer;
