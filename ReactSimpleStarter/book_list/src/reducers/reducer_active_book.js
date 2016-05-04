// state argument is NOT the application state, it is only the previously reducer's generated state.
// undefined cannot be returned and must be handled by returning a non undefined value, by defaulting the value of the argument 'state' to 'null' via ES6
export default function(state = null, action){
    switch(action.type){
        case 'BOOK_SELECTED': 
            return action.payload;
    }
    // base state: we don't care about the current action, simply return the current state
    return state;
}