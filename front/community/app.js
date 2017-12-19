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

import './sass';

ReactDOM.render((
  <Provider store = { store }>
    <Router>
      <Index>
        <Route exact strict path = '/community' component = { Page } />
        <Route exact strict path = '/community/page2' component = { Page2 } />
      </Index>
    </Router>
  </Provider>
), document.getElementById('content'));
