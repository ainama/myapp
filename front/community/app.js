import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import todoApp from './reducers';
const store = createStore(todoApp);

import Page from './container/page';
import Page2 from './container/page2';
import Login from './component/login.js';

import './sass';

ReactDOM.render((
  <Provider store = { store }>
    <Router>
      <div>
        <Route exact strict path = '/community' component = { Page } />
        <Route exact strict path = '/community/page2' component = { Page2 } />
        <Route exact strict path = '/community/login' component = { Login } />
      </div>
    </Router>
  </Provider>
), document.getElementById('content'));
