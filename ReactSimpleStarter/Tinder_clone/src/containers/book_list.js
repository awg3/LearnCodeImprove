import React, {Component} from 'react';
import {connect} from 'react-redux'; // importing connect only from the library.
import {selectBook} from '../actions/index';
import {bindActionCreators} from 'redux'; // bindActionsCreators makes sure that the action generated by our action creator, flows through the reducers in our application.

class BookList extends Component {
    /*  - Creates an unordered list which gets list items from the helper function renderList.
        - renderList maps an imported array of books into an array.
        - Each book in the array is contained in a list element (li) which contains the book's title, and is unique by book title.(via the key attribute). 
        - Use the React/Redux library to pass the state into the BookList, by promoting this component to be a Container instead.
        - A container is a bridge between redux and react. Using the mapStateToProps function for that.
    */
    renderList(){
        return this.props.books.map((book) => {
            return(
                <li onClick={() => this.props.selectBook(book)}
                    key={book.title}
                    className="list-group-item">
                    {book.title}
                </li>
            );
        });
    }
    
    render(){
        return (
            <ul className="list-ground col-sm-4">
                {this.renderList()}
            </ul>
        );
    }
}

function mapStateToProps(state){
    // this.props contains the return statement of mapStateToProps which is the application state (books).
    // when the application state changes render will be called, it and will call this function, which will produce a new list of books from our reducer.
    return {
        books: state.books // makes books accessible in BookList as this.props.books
    };
}

// Anything returned from mapDispatchToProps function will end up as props on the BookList container.
function mapDispatchToProps(dispatch){
    // When selectBook (our action creator) is called, the result of it should be passed (dispatched) to all our reducers.
    return bindActionCreators({selectBook: selectBook}, dispatch);
}

// Promote BookList from a component to a container - it needs to know about this new dispatch method, selectBook. Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList); // connect takes two arguments: a function/list of functions, and a component. It produces a container. The container is a component aware of the state contained in Redux. 