import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {

  // constructor() {
  //   super();

  // }

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
  onClick: PropTypes.func.isRequired
}