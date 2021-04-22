// Modules
import React from 'react';
import PropTypes from 'prop-types';

// Stlyes
import './movieCard.scss';

export class MovieCard extends React.Component {


  render() {
    const { movie, onMovieClick } = this.props;
    return <div onClick={ () => {onMovieClick(movie)} } className="movie-card"> { movie.title } </div>;
  }

}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}