import axios from 'axios';

const API_KEY = '0e342235956bd2f58090b9749ae9c48f';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

// Action: Create API request to fetch weather data
// actions always return at a minimum an action type.
export function fetchWeather(city, country){
    const url = `${ROOT_URL}&q=${city},${country}`,
          request = axios.get(url); // axios.get returns a promise.

    // console.log('Request: ', request);

    return {
        // If the payload is a promise, redux-promise stops the action entirely and
        // it waits until the promise is resolved.
        // Then once the request is finished, it dispatches an action of the same type,
        // but with the payload of the resolved request.
        type: FETCH_WEATHER,
        payload: request // asynchronous promise (request) is being returned as a payload.
    };
}
