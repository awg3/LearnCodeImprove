import { FETCH_POSTS, FETCH_POST } from '../actions/index';

const INITIAL_STATE = {
  all: [], // array of blog posts
  post: null // a single post
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case FETCH_POSTS:
      // takes in our new state, then concatenates the payload data to it.
      return {
        ...state,
        all: action.payload.data
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload.data
      };
    default:
      return state;
  }
}
