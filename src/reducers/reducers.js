import { combineReducers } from 'redux'

import { 
  SET_USER,
  CLEAR_USER,
  SET_MOVIES, 
  MOVIE_FILTER 
} from '../actions/actions'



const user = ( state = null, action ) => {
  switch(action.type) {
    case SET_USER:
      return action.payload;
    case CLEAR_USER:
      return action.payload;
    default: 
      return state;
  }
}

const movies = ( state = [], action ) => {
  switch(action.type) {
    case SET_MOVIES:
      return action.payload;
    default: 
      return state;
  }
}

const movieFilter = ( state = '', action ) => {
  switch(action.type) {
    case MOVIE_FILTER:
      return action.payload;
    default: 
      return state;
  }
}

const appReducers = combineReducers({
  user,
  movies,
  movieFilter
})

export default appReducers;