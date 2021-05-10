import React from 'react';
import PropType from 'prop-types';

// React-bootstrap component
import { Spinner, Col} from 'react-bootstrap';

//Custome Component 
import { MovieList } from '../movieList/movieList';

export function GenreView(props) {
console.log(props.movies)

  return (
    <div >
      Building...
      <Spinner animation="border" role="status">
        <span className="sr-only">Building...</span>
      </Spinner>
      <div>
        {
          props.movies.map( (m, i) => (
                <Col xs={6} lg={2} key={i} className="p-2">
                  <MovieList key={m._id} movie={m} />
                </Col>
              ))
        }
      </div>
    </div>
  )
}