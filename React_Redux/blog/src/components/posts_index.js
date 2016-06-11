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
        <Link to={`posts/${post.id}`} className="list-group-link">
          <li className="list-group-item" key={post.id}>
            <span>{post.title}</span>
            <span className="pull-xs-right">{post.categories}</span>
          </li>
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="row margin__top-bottom-30px">
          <div className="col-xs-6">
            <h3>Post List</h3>
          </div>
          <div className="col-xs-6">
            <Link to="/posts/new" className="btn btn-primary pull-xs-right">
              Add a Post
            </Link>
          </div>
        </div>
        <div>
          <ul className="list-group">
            <li className="list-group-item list-title">
              <span className="pull-xs-left">Title</span>
              <span className="pull-xs-right">Category</span>
            </li>
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
