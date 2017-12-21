import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { test } from './test';
import { header } from './header';

const rootReducer = combineReducers({
  test,
  header
});

export default rootReducer;
