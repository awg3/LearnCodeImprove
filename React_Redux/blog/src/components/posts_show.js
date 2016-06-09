import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index';

class PostsShow extends Component {
  componentWillMount(){
    // This method ensures that anything within will run as soon as the component is about to show.
    // fetching the post via id.
    this.props.fetchPost(this.props.params.id);
  }
  render(){
    return (
      <div>
        Show post {this.props.params.id}
      </div>
    );
  }
}

export default connect(null, { fetchPost })(PostsShow);
