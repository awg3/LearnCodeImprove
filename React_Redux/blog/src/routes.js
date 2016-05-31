import React from 'react';
// The Route object is used to define a match between a URL and a component.
import { Route, indexRoute } from 'react-router';
import App from './components/app';

export default (
  <Route path='/' component={App} />
);
