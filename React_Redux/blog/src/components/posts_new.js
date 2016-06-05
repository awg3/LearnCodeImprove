import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  render(){
    /* The below is ES6 for:
      const fields = {
        this.props.fields.title,
        this.props.fields.categories,
        this.props.fields.content
      };
     const handleSubmit = this.props.handleSubmit;
    */
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    /* Destructuring of an object: {...objectName}
      - Ensures every property on the title object shows up inside the input
      - Which means, the input event handlers and other input properties given from reduxForm
        are attached to the HTML input element we want to attach the redux object to.
    */

    // handleSubmit: a native reduxForm function (see documentation).

    return (
      <form onSubmit={handleSubmit(this.props.createPost)}>
        <h3>Create a new post</h3>
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

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
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

/* Note:
- connect: 1st argument is mapStateToProps, 2nd argument is mapDispatchToProps.
- reduxForm: form config, mapStateToProps, mapDispatchToProps.
*/

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, {createPost})(PostsNew);
