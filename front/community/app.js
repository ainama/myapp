import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import todoApp from './reducers';
const store = createStore(todoApp);

import Page from './container/page';
import Page2 from './container/page2';

import './sass';

ReactDOM.render((
  <Provider store = { store }>
    <Router>
      <div>
        <Route exact strict path = '/' component = { Page } />
        <Route exact strict path = '/page2' component = { Page2 } />
      </div>
    </Router>
  </Provider>
), document.getElementById('content'));
