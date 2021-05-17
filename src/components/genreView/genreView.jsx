import React from 'react'
import PropTypes from 'prop-types'

// React-bootstrap component
import { Container, Row, Col, Spinner} from 'react-bootstrap'

//Custome Component 
import { MovieList } from '../movieList/movieList'
import ControlsBar from '../controlsBar/controlsBar'
function GenreView({ movies, onBackClick }) {
  return (
    <div>
      <ControlsBar onBackClick={onBackClick}/>
      <div>
        <pre>{movies[0].genre.name}</pre>
        <pre>{movies[0].genre.description}</pre>
      </div>
      <Container>
        <Row>
            {
              movies.map( (m, i) => (
                    <Col xs={4} lg={3} key={i} className="p-2">
                      <MovieList key={m._id} movie={m} />
                    </Col>
                  ))
            }
        </Row>
      </Container>
    </div>
  )
}

GenreView.propType = {
  movies: PropTypes.object,
  onBackClick: PropTypes.func
}

export default GenreView;