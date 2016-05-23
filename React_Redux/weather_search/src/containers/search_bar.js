import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchWeather} from '../actions/index';

class SearchBar extends Component {
    constructor(props){
        super(props);

        // term -> a search term.
        this.state = {term: ''};

        // binds 'this' object to SearchBar, which is used by onInputChange and onFormSubmit.
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

        // fetchWeather: an action creator, which gets the data from OpenWeatherForecast API via a promise.
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

// setting up the fetchWather action creator to be connected to this container.
function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchWeather}, dispatch);
}

// connecting the fetchWeather action creator to this container.
// null is being passed instead of state, because we are not using it in this case.
export default connect(null, mapDispatchToProps)(SearchBar);
