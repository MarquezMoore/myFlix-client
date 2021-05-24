// Modules
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

// React-router-dom Components 
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

// React-bootstrap components 
import { Container, Row, Col, Button, Image} from 'react-bootstrap'

import { setUser } from '../../actions/actions'

// Styles 
import './movieView.scss'

const mapStateToProps = state => {
  const { user } = state;
  return { user };
}

const MovieView = ({ setUser, user, movie, onBackClick }) => {
  const [ hidden, setHidden ] = useState('');
  const [ favorites, setFavorites ] = useState(user.data.movies);

  

  useEffect( () => {
    const result = user.data.movies.find( m => m === movie._id);
    result ? setHidden('hidden') : setHidden('');
  }, favorites)
/*
  Add movie to user's favorites
*/

  const addToFavorites = () => {
    axios.put(`https://my-fav-flix.herokuapp.com/api/users/${user.data.username}/${movie._id}`, {}, {
      headers: {Authorization: `Bearer ${user.token}`}
    })
      .then( user => {
        setUser(user.data, 'update');
        setHidden('hidden');
        localStorage.setItem('user', JSON.stringify( user.data ));
      })
      .catch( err => {
        console.log(err.response);
      })
  }

/*
  Remove movie from user's favorites
*/
  const removeFromFavorites = () => {
    axios.delete(`https://my-fav-flix.herokuapp.com/api/users/${user.data.username}/${movie._id}`, {
      headers: {Authorization: `Bearer ${user.token}`}
    })
      .then( user => {
        console.log(user.data);
        setUser(user.data, 'update');
        setHidden('');
        localStorage.setItem('user', JSON.stringify( user.data ));
      })
      .catch( err => {
        console.log(err.response);
      })
  }

  return ( 
    <div className="wrapper w-100">

      <Container fluid className="hero" >
        <Button onClick={onBackClick} className="add mt-3 w-100"> Back</Button>
      </Container>

      <Container className="movie-view p-4">
        <Row className="d-flex movie-container">
          <Col className="movie-image col-4 d-flex flex-column p-4"> 
            <img className="image rounded w-100 shadow align-self-center" src={ movie.imageURL } alt="Movie image"/>
            <Button hidden={hidden} onClick={addToFavorites} className="add mt-3 w-100"> + Add</Button>
            <Button hidden={!hidden} onClick={removeFromFavorites} className="remove mt-3 w-100"> - Remove</Button>
          </Col>
          <Col className="movie-details col-8" >
            <div className="movie-title "> 
              <span className="value fs-4">{ movie.title }</span> 
            </div>
            <div className="d-flex py-4">
              <div className="movie-detail-btn"> 
                <Link to={`../genre/${movie.genre.name}`}>
                  <span className="value">
                    { movie.genre.name }
                  </span>
                </Link>
              </div>
              <div className="movie-detail-btn"> 
                <span className="label fw-bold">Director: </span>
                <Link to={`../director/${movie.director.name}`}>
                  <span className="value">
                    { movie.director.name }
                  </span>
                </Link>
              </div>
            </div>
            <div className="movie-description"> 
              <span className="label fw-bold">Description: </span>
              <span className="value">{ movie.description }</span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { setUser })(MovieView);