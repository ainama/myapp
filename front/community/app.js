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
import Home from './container/home';
import AddArticle from './container/addArticle';
import ShowArticle from './container/showArticle';

import './sass';

ReactDOM.render((
  <Provider store = { store }>
    <Router>
      <Index>
        <Route exact strict path = '/community' component = { Page } />
        <Route exact strict path = '/community/page2' component = { Page2 } />
        <Route exact strict path = '/community/home' component = { Home } />
        <Route exact strict path = '/community/addArticle' component = { AddArticle } />
        <Route exact strict path = '/community/showArticle' component = { ShowArticle } />
      </Index>
    </Router>
  </Provider>
), document.getElementById('content'));
