import React from 'react';
// The Route object is used to define a match between a URL and a component.
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="posts/new" component={PostsNew} />
    <Route path="posts/:id" component={PostsShow} />
  </Route>
);

/*
  The route path for PostsShow is populated via :id.
  :id is parsed by ReactJS by using the provided id from this.props.params.id
*/
