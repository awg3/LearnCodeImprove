import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchWeather} from '../actions/index';

class SearchBar extends Component {
    constructor(props){
        super(props);
        
        // term -> a search term.
        this.state = {term: ''};
        
        // binds the 'this' object to SearchBar, then bind 'this' to the instance of onInputChange/onFormSubmit which is: this.onInputChange/this.onFormSubmit respectively.
        this.onInputChange = this.onInputChange.bind(this); 
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    
    onInputChange(event){
        // passes the input value to the state, which gets passed onto the input text field.
        this.setState({term: event.target.value});
    }
    
    onFormSubmit(event){
        // prevent submitting the page.
        event.preventDefault();
        
        // Fetch weather data from OpenWeatherForecast API.
        this.props.fetchWeather(this.state.term, 'us');
        
        // whenever submit is clicked/pressed, it will call our action creator with the search term entered, which will set the term to '' (empty string), which will then cause our component to re-render. The input's value will be set to '' as well.
        this.setState({term: ''}); 
    }
    
    render(){
        // whenever the input changes, we want to update the state.
        return(
            <form className="input-group" onSubmit={this.onFormSubmit}>
                <input
                    placeholder="Get a five day forecast in any city."
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange}
                />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchWeather}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar); // null is being passed instead of state, because we are not using it in this case.