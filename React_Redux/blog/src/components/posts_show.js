import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index';
import { deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {

  // contextTypes: gives PostsShow access to the router.
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount(){
    // This method ensures that anything within will run as soon as the component is about to show.
    // fetching the post via id.
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick(){
    this.props.deletePost(this.props.params.id).then(() => {
      this.context.router.push('/');
    });
  }

  render(){
    // ES6: const props = this.props.post
    const { post } = this.props;

    if(!post){
      // Load this while the promise resolves to get the post.
      return(
        <div>Loading...</div>
      );
    }
    else {
      return (
        <div>
          <div className="row">
            <div className="col-xs-6">
              <Link to="/" className="btn btn-primary pull-xs-left">
                Back
              </Link>
            </div>
            <div className="col-xs-6">
              <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>
                Delete Post
              </button>
            </div>
          </div>
          <div className="margin__top-bottom-30px">
            <h3>Title: { post.title }</h3>
            <h6>Categories: { post.categories }</h6>
            <p>Content: { post.content }</p>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state){
  return {
    post: state.posts.post
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
