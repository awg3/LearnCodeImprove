import React, {Component} from 'react';
import {connect} from 'react-redux'; // importing connect only from the library.

class BookList extends Component {
    /*
        Description:
        - Creates an unordered list which gets list items from the helper function renderList.
        - renderList maps an imported array of books into an array.
        - Each book in the array is contained in a list element (li) which contains the book's title, and is unique by book title.(via the key attribute). 
        - Use the React/Redux library to pass the state into the BookList, by promoting this component to be a Container instead.
        - A container is a bridge between redux and react. Using the mapStateToProps function for that.
    */
    renderList(){
        return this.props.books.map((book) => {
            return(
                <li key={book.title} className="list-group-item">
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
    // this.props will now contain the return statement of this function. In our case, the application state which is books.
    // when the application state changes, render will be called it and will call this function, which will produce a new list of books from our reducer.
    return {
        books: state.books // makes books accessible in BookList as this.props.books
    }
}

export default connect(mapStateToProps)(BookList); // connect takes two arguments: a function and a component, it produces a container. Container is a Component who is aware of the state contained in Redux.