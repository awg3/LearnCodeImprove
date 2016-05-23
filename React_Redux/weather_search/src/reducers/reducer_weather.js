import {FETCH_WEATHER} from '../actions/index';

export default (state = [], action) =>{
    console.log('fetch weather type: ', action.type);
    console.log('action received: ', action);
    switch(action.type){
        case FETCH_WEATHER:
            // 'payload' is a promise, so it is being handled when it is resolved.
            // the below is ES6 equivalent for: state.concat([action.payload.data]);
            // concat is used because the state needs to be updated, not overwriden.
            return [action.payload.data, ...state];

            // action.payload.then(function(response) {
            //     console.log(response.data);
            //     return [response.data, ...state];
            // });
    }

    return state;
}
