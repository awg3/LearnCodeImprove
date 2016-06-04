import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// broweserHistory: whenever the URL updates, react-router is going to interpret everything after the browse protocol (the root URL).
import { Router, browserHistory } from 'react-router';
import reducers from './reducers';

import promise from 'redux-promise';

// importing Routes
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
  , document.querySelector('.container'));
