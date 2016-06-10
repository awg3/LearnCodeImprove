import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props){
    this.props.createPost(props).then(() => {
      // promise resolved, blog post successfully crated.
      // re-direct to the home page.
      this.context.router.push('/')
    });
  }

  render(){
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3 className="form-title">Create a new post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-danger">
            { title.touched ? title.error : '' }
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
          <div className="text-danger">
            { categories.touched ? categories.error : '' }
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content}/>
          <div className="text-danger">
            { content.touched ? content.error : '' }
          </div>
        </div>

        <div className="margin__top-bottom-30px">
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger cancel-button">Cancel</Link>
        </div>
      </form>
    );
  }
}

function validate(values){
  const errors = {};

  if(!values.title){
    errors.title = 'Enter a user name';
  }

  if(!values.categories){
    errors.categories = 'Enter categories';
  }

  if(!values.content){
    errors.content = 'Enter some content';
  }

  return errors;
}

export default reduxForm(
  {
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
  },
  null,
  {createPost}
)(PostsNew);

/* Notes:
  1. const { fields: { title, categories, content }, handleSubmit } = this.props;
    is ES6 for:

    const fields = {
      this.props.fields.title,
      this.props.fields.categories,
      this.props.fields.content
    };
    const handleSubmit = this.props.handleSubmit;

  2. Destructuring of an object: {...objectName}
    - Ensures every property on the title object shows up inside the input
    - Which means, the input event handlers and other input properties given from reduxForm
      are attached to the HTML input element we want to attach the redux object to.

  3. handleSubmit: a native reduxForm function (see documentation).
  - In our implementation, handleSubmit is being used to call our onSubmit function
    while passing it the properties of the handleSubmit object, captured in 'this'.

  4. createPost: an action creator that creates a promise as its payload.

  4. Difference between reduxForm and connect methods:
  - connect: 1st argument is mapStateToProps, 2nd argument is mapDispatchToProps.
  - reduxForm: form config, mapStateToProps, mapDispatchToProps.

  5. contextTypes:
  - contextTypes defines a new object on the PostNew class.
  - React now interprets contextTypes whenever an instance of PostsNew is created.
  - It will take note of contextTypes and its properties.
  - React will traverse the PostsNew tree looking for parents who have the property router.
  - In our case, router exists inside blog/src/index.js, said router will provide the context to the contextTypes object.
  - Doing this works like the props object. But in order to use context we must explicitly declare it, while also
    asking React to look up the tree for the router object.
*/
