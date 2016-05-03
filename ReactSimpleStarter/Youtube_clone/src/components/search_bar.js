'use strict';

import React, {Component} from 'react';

// the React, {Component} basically means const Component = React.Component, where Component can now be used without using React.Component

/*
// Using a function component to represent a search bar.
const SearchBar = () => {
    return <input />;
};
*/

// Using a class as a component to represent a search bar.
class SearchBar extends Component {
    // All ES6 classes have a constructor method, it is called anytime a new instance of the class is created.
    // Constructor are used to initialize our class's setup.
    constructor(props){
        super(props); // calling the Component's props parent method.
        this.state = {term: ""}; // recording the property 'term' on 'state'. Term will be updated to be the value of the input field.
        // State: is used to record and react to user events.
        // Each class based component has its own state object.
        // Whenever the component state is changed, it runs the render function for itself and its children.
        // The state object must be initialized prior to being used.
    }
    
    render(){ // must have method on every component.
        return (
            <div className="search-bar">
                <input
                    value = {this.state.term}
                    onChange={
                        event => this.onInputChange(event.target.value)
                    }
                    // value = {this.state.term} makes SearchBar a controlled component, thus the input value only changes when the 'state' of the component changes. When the user enters an input, 'onChange' is triggered. It assigns the event value to 'term', which is then assigned to 'value' via 'state'. 
                />
            </div>
        );
        // functionality is the same, which is good, added an event handler.
        // the onChange event handler is passed the 'event' and the 'event' is used accordingly.
        // the state component states receives the event, which then can be used as such to maintain continuity.
    }
    
    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term); // used in index.js 
    }
}

// Allowing the SeachBar component to be imported by our other JSX files.
export default SearchBar;