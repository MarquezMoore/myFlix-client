/*
  Action Types
*/
export const SET_USER = 'SET_USER';
export const SET_MOVIES = 'SET_MOVIES'
export const MOVIE_FILTER = 'FILTER_MOVIES';

/*
  Action Creators
*/
export const setUser = (user, meta) => {
  return {
    type: SET_USER,
    payload: user,
    meta: meta
  }
}
export const movieFilter = value => {
  return {
    type: MOVIE_FILTER,
    payload: value
  }
}
export const setMovies = movies => {
  return {
    type: SET_MOVIES,
    payload: movies
  }
}