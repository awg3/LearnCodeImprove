import React, {Component} from 'react';
import {connect} from 'react-redux';

class WeatherList extends Component{
    renderWeather(cityData){
        //console.info("at renderWeather");
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
                  {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({weather}){ // {weather} is ES6 for: const weather = state.weather
    console.log('weather: ', weather);
    return {weather}; // ES6 for: {weather: weather}, the right side weather is the mapStateToProps parameter.
}

export default connect(mapStateToProps)(WeatherList);
