import React from 'react';
// The Route object is used to define a match between a URL and a component.
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="posts/new" component={PostsNew} />
  </Route>
);
