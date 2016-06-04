import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
  // A Lifecycle method: automatically called by React when the component is going to be rendered by the DOM for the first time.
  componentWillMount(){
    // Fetching data from API
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>List of blogs</div>
    );
  }
}

export default connect(null, {fetchPosts})(PostsIndex);
