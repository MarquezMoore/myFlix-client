// Module
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Component 
import axios from 'axios'

import { connect } from 'react-redux'

// React-bootdtrap components 
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import { MovieCard }  from '../movieCard/movieCard'
import SearchBar from '../searchBar/searchBar'
import './profileView'

const mapStateToProps = state => {
  const { user, movies } = state;
  return { user, movies };
}

const ProfileView = ({ user, token, movies, onBackClick}) => {
  const [ userFavorites, setUserFavorites] = useState( () => {
    const favorites = []
    
    movies.map( m => {
      user.data.movies.indexOf(m._id) !== -1 ? favorites.push(m) : false;
    })

    return favorites;
  });

  return(
    <div className="wrapper d-flex flex-column flex-grow-1">
      <Container fluid className="hero d-flex flex-column align-items-end p-4" >
        <Button onClick={onBackClick} className="back-btn action"> &#x2190; Back</Button>
        <div className="d-flex flex-column text-light justify-content-center align-items-start w-100 h-100 pb-5">
          <span className="fs-1">Favorites</span>
        </div>
      </Container>
      <Container className="userMovies">
        <Row className="m-2">
          {
            userFavorites.length === 0 
            ? <Col className="text-dark">No have no favorites... </Col>
            : userFavorites.map( (m, i) => (
                <Col key={`col-${i}`} xs={4} lg={3} key={i} className="p-2">
                  <MovieCard key={`movie-${i}`} movie={m}/>
                </Col>
            ))
          }
        </Row>
      </Container>
    </div>
      

  )
}

ProfileView.prototypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  onBackClick: PropTypes.func,
  onLogOut: PropTypes.func,
}

export default connect(mapStateToProps)(ProfileView);