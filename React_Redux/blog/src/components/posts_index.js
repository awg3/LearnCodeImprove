import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';

// Link: A React component, which is an anchor tag.
import { Link } from 'react-router';

class PostsIndex extends Component {
  // A Lifecycle method: automatically called by React when the component is going to be rendered by the DOM for the first time.
  componentWillMount(){
    // Fetching data from API
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(null, {fetchPosts})(PostsIndex);
