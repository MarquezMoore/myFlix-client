import React from 'react';
import PropTypes from 'prop-types';

// React-bootstrap components 
import { Button, Container, Row, Col } from 'react-bootstrap';

import { MovieCard } from '../movieCard/movieCard'

function DirectorView({ movies, director, onBackClick }) {
  return (
    <>
      <Container fluid className="hero d-flex flex-column align-items-end p-4" >
        <Button onClick={onBackClick} className="back-btn action"> &#x2190; Back</Button>
        <div className="d-flex flex-column text-light justify-content-center align-items-start w-100 h-100 pb-5">
          <div className="d-flex flex-column">
            <div>
              <span className="fs-1">{director.name}</span>
            </div>
            <div className="d-flex text-light pb-2">
              <span className="pe-4"><strong>Born:</strong> {director.birthday}</span>
              <span><strong>{director.deathday ? 'Death: ': ''}</strong> {director.deathday}</span>
            </div>
          </div>
          <span>{director.bio}</span>
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

DirectorView.prototypes = {
  director: PropTypes.object,
  onBackClick: PropTypes.func
}

export default DirectorView;