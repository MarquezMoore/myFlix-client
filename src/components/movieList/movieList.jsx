// Modules
import React from 'react';
import PropTypes from 'prop-types';

// React-Bootstrap Components
import { Card } from 'react-bootstrap';


// React-router-dom components
import { Link } from 'react-router-dom';

// Stlyes
import './movieList.scss';

export class MovieList extends React.Component {


  render() {
    const { movie } = this.props;
    return (
      <div>
        <Link to={`movie/${movie._id}`}>
          <Card >
            <Card.Img src={ movie.imageURL } />
          </Card>
        </Link>
      </div>
    );
  }
}

MovieList.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired
  }).isRequired,
}