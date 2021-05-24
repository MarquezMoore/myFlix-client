import state from '../state/state'
import { combineReducers } from 'redux'

import { 
  SET_USER,
  SET_MOVIES, 
  MOVIE_FILTER 
} from '../actions/actions'


/*
  Duplication of state to ensure reducers function maintain there purity 
*/ 
const initialState = state;

const user = ( state = initialState.user, action ) => {
  switch(action.type) {
    case SET_USER:
      return action.meta === 'login' || action.meta === 'refresh' || action.meta === 'delete'
        ? action.payload
        : {
            ...state,
            data: action.payload
          }
    default: 
      return state;
  }
}

const movies = ( state = initialState.movies, action ) => {
  switch(action.type) {
    case SET_MOVIES:
      return action.payload;
    default: 
      return state;
  }
}

const movieFilter = ( state = initialState.movieFilter, action ) => {
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