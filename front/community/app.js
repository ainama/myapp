import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import todoApp from './reducers';
const store = createStore(todoApp);

import Index from './index';
import Page from './container/page';
import Page2 from './container/page2';
import AddArticle from './container/addArticle';
import ShowArticle from './container/showArticle';
import PersonalPage from './container/PersonalPage';
import SettingPage from './container/SettingPage';

import './sass';

ReactDOM.render((
  <Provider store = { store }>
    <Router>
      <Index>
        <Route exact strict path = '/community' component = { Page } />
        <Route exact strict path = '/community/page2' component = { Page2 } />
        <Route exact strict path = '/community/addArticle' component = { AddArticle } />
        <Route exact strict path = '/community/showArticle' component = { ShowArticle } />
        <Route exact strict path = '/community/personal' component = { PersonalPage } />
        <Route exact strict path = '/community/setting' component = { SettingPage } />
      </Index>
    </Router>
  </Provider>
), document.getElementById('content'));
