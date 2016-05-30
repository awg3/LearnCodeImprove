import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/googlemap';

class WeatherList extends Component{

  renderWeather(cityData){
    const name = cityData.city.name;
    // Temperature in Kelvin, transformed into Celcius.
    const temps = cityData.list.map(weather => weather.main.temp - 273);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td>
          <GoogleMap lon={lon} lat={lat} />
          {name}
        </td>
        <td><Chart data={temps} color="blue" units="C" /></td>
        <td><Chart data={pressures} color="green" units="hPa" /></td>
        <td><Chart data={humidities} color="orange" units="%" /></td>
      </tr>
    );
  }

  render(){
    return (
      <table className="table table-hover">
          {
            this.props.weather.length ?
            <thead className="black-bg-white-text">
                <tr>
                    <th>City</th>
                    <th>Temperature</th>
                    <th>Pressure</th>
                    <th>Humidity</th>
                </tr>
            </thead>
            : null
          }
          <tbody>
              {this.props.weather.map(this.renderWeather)}
          </tbody>
      </table>
    );
  }
}

function mapStateToProps({weather}){ // {weather} is ES6 for: const weather = state.weather
  // console.log('weather: ', weather);
  return {weather}; // ES6 for: {weather: weather}, the right side weather is the mapStateToProps parameter.
}

export default connect(mapStateToProps)(WeatherList);
