/*
  Action Types
*/
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const SET_MOVIES = 'SET_MOVIES'
export const MOVIE_FILTER = 'FILTER_MOVIES';
export const DELTE_PROFILE = 'DELTE_PROFIle';

/*
  Action Creators
*/
export const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  }
}
export const clearUser = () => {
  return {
    type: CLEAR_USER,
    payload: null
  }
}
export const editProfile = user => {
  return {
    type: EDIT_PROFILE,
    payload: user
  }
}
export const addToFavorites = ( user, movieID ) => {
  return {
    type: ADD_TO_FAVORITES,
    payload: {user, movieID}
  } 
}
export const removeFromFavorites = ( user, movieID ) => {
  return {
    type: REMOVE_FROM_FAVORITES,
    payload: {user, movieID}
  } 
}
export const movieFilter = (movieFilter, movies) => {
  return {
    type: MOVIE_FITLER,
    payload: {filterString, movies}
  }
}
export const deleteProfile = user => {
  return {
    type: DELETE_PROFILE,
    payload: user
  }
}
export const setMovies = movies => {
  return {
    type: SET_MOVIES,
    payload: movies
  }
}