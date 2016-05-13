import {FETCH_WEATHER} from '../actions/index';

export default (state = [], action) =>{
    switch(action.type){
        case FETCH_WEATHER:
            // returning state as an array, because we will have multiple cities coming through this reducer.
            // always return a new instance of state.
            // the below is ES6 equivalent for: state.concat([action.payload.data]);
            // concat is used because the state needs to be updated, not overwriden.
            return [action.payload.data, ...state];
    }
    
    return state;
}