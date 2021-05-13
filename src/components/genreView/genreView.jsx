import React from 'react'
import PropTypes from 'prop-types'

// React-bootstrap component
import { Spinner, Col} from 'react-bootstrap'

//Custome Component 
import { MovieList } from '../movieList/movieList'

function GenreView({ movies, onBackClick }) {
  return (
    <>
      <div>
        <pre>{movies[0].genre.name}</pre>
        <pre>{movies[0].genre.description}</pre>
      </div>
      <div>
        {
          movies.map( (m, i) => (
                <Col xs={6} lg={2} key={i} className="p-2">
                  <MovieList key={m._id} movie={m} />
                </Col>
              ))
        }
      </div>
      <button onClick={onBackClick}>Back</button>
    </>
  )
}

export default GenreView;
GenreView.propType = {
  movies: PropTypes.object,
  onBackClick: PropTypes.func
}