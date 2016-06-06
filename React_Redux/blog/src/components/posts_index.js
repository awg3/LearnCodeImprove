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

  renderPosts(){
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <strong className="pull-xs-right">{post.title}</strong>
          <span>{post.categories}</span>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
          <div className="text-xs-right">
            <Link to="/posts/new" className="btn btn-primary">
              Add a Post
            </Link>
          </div>
          <div>
            <h3>Posts</h3>
            <ul className="list-group">
              {this.renderPosts()}
            </ul>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
