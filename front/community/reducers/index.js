import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { article } from './article';
import { header } from './header';
import { home } from './home';
import { userInfo, userArticles, userLikes } from './personal.js';

const rootReducer = combineReducers({
  article,
  header,
  home,
  userInfo,
  userArticles,
  userLikes
});

export default rootReducer;
