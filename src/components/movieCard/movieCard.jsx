// Modules
import React from 'react';
import PropTypes from 'prop-types';

// React-Bootstrap Components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Stlyes
import './movieCard.scss';

export class MovieCard extends React.Component {


  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <Card style={{ width: '18rem'}}>
        <Card.Img variant="top" src={ movie.imageURL } />
        <Card.Body>
          <Card.Title> { movie.title } </Card.Title>
          <Card.Text> { movie.description } </Card.Text>
        </Card.Body>
        <Button onClick={ () => {onMovieClick(movie)} }>
          See More
        </Button>
      </Card>
  
    );
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