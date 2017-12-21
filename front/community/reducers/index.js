import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { test } from './test';
import { article } from './article';

const rootReducer = combineReducers({
  test,
  article
});

export default rootReducer;
