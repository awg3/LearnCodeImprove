import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather';

// Making the reducer_weather reducer accessible to the rest of our app via combineReducers
const rootReducer = combineReducers({
  weather: WeatherReducer
});

export default rootReducer;
