// Modules
import React from 'react';
import PropTypes from 'prop-types';

// React-Bootstrap Components
import { Card } from 'react-bootstrap';


// React-router-dom components
import { Link } from 'react-router-dom';

// Stlyes
import './movieCard.scss';

export class MovieCard extends React.Component {


  render() {
    const { movie } = this.props;
    return (
      <div>
        <Link to={`/movie/${movie._id}`}>
          <Card className="border-0 rounded-3" >
            <Card.Img src={ movie.imageURL } />
          </Card>
        </Link>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}