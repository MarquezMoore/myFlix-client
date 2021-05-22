// Modules
import React from 'react';
import PropTypes from 'prop-types';


import { connect } from 'react-redux';

import { Col } from 'react-bootstrap';

import { MovieCard } from '../movieCard/movieCard'

import SearchBar from '../searchBar/searchBar'
// Stlyes
import './movieList.scss';

const mapStateToProps = state => {
  const { movieFilter } = state;
  return { movieFilter };
}

const MovieList = props =>{
  const { movies, movieFilter } = props;
  let filteredMovies = movies;

  if( movieFilter !== '') {
    filteredMovies = movies.filter( m => 
      m.title.toLowerCase().includes( movieFilter.toLowerCase())
  );

  if(!movies) return <div>No movies found</div>
  }

  return (
    <>
      <SearchBar />
      <div className="d-flex flex-wrap py-4">
        {filteredMovies.map( m => (
          <Col xs={4} lg={3} className="p-2" key={m._id}>
            <MovieCard movie={m} />
          </Col>
        ))}
      </div>
    </>
  )
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  movieFilter: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(MovieList);