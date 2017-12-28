import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import Index from './index';
import Home from './container/home';
import AddArticle from './container/addArticle';
import ShowArticle from './container/showArticle';
import PersonalPage from './container/PersonalPage';
import SettingPage from './container/SettingPage';

import './sass';

import reducer from './reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';

const middleware = process.env.NODE_ENV === 'production'
? [ thunk, ReduxPromise ] : [ thunk, createLogger(), ReduxPromise ];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

ReactDOM.render((
  <Provider store = { store }>
    <Router>
      <Index>
        <Route exact strict path = '/community/home' component = { Home } />
        <Route exact strict path = '/community/addArticle' component = { AddArticle } />
        <Route exact strict path = '/community/addArticle/:article' component = { AddArticle } />
        <Route exact strict path = '/community/showArticle/:article' component = { ShowArticle } />
        <Route exact strict path = '/community/personal/:uid' component = { PersonalPage } />
        <Route exact strict path = '/community/setting' component = { SettingPage } />
      </Index>
    </Router>
  </Provider>
), document.getElementById('content'));
