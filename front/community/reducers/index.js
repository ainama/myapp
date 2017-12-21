import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { test } from './test';
import { article } from './article';
import { header } from './header';

const rootReducer = combineReducers({
  test,
  article,
  header
});

export default rootReducer;
