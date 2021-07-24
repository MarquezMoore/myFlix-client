import React from 'react'
import PropTypes from 'prop-types'

// React-bootstrap component
import { Container, Row, Col, Button, Spinner} from 'react-bootstrap'

//Custome Component 
import { MovieCard } from '../movieCard/movieCard'

const  GenreView = ({ movies, onBackClick }) => {
  return (
    <>
      <Container fluid className="hero d-flex flex-column align-items-end p-4" >
        <Button onClick={onBackClick} className="back-btn action"> &#x2190; Back</Button>
        <div className="d-flex flex-column text-light justify-content-center align-items-start w-100 h-100 pb-5">
          <span className="fs-1">{movies[0].genre.name}</span>
          <p>{movies[0].genre.description}</p>
        </div>
      </Container>
      <Container>
        <Row className="m-2">
          {
            movies.map( (m, i) => (
              <Col xs={4} lg={3} key={i} className="p-2">
                <MovieCard key={m._id} movie={m}/>
              </Col>
            ))
          }
        </Row>
      </Container>
    </>
  )
}

GenreView.propType = {
  movies: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default GenreView;