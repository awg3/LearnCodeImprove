import React, {Component} from 'react';
import {connect} from 'react-redux';

class WeatherList extends Component{
    renderWeather(cityData){
        console.log("good");
        
        const name = cityData.city.name;
        
        return (
            <tr>
                <td key={name}>
                    {name}
                </td>
            </tr>
        );
    }
    
    render(){
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature</th>
                        <th>Pressure</th>
                        <th>Humidity</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({weather}){ // {weather} is ES6 for: const weather = state.weather
    console.log({weather});
    return {weather}; // ES6 for: {weather: weather}, the right side weather is the function parameter.
}

export default connect(mapStateToProps)(WeatherList);