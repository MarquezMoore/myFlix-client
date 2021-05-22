// Modules
import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

// React-router-dom Components 
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

// React-bootstrap components 
import { Container, Row, Col, Button, Image} from 'react-bootstrap'

import ControlsBar from '../controlsBar/controlsBar'

import { setUser, addToFavorites, removeFromFavorites } from '../../actions/actions'

// Styles 
import './movieView.scss'

const mapStateToProps = state => {
  const { user } = state;
  return { user };
}

const MovieView = ({ setUser, user, movie, onBackClick }) => {
 /*
  Add movie to user's favorites
*/
  const addToFavorites = movie => {
    axios.put(`https://my-fav-flix.herokuapp.com/api/users/${user.data.username}/${movie._id}`, {}, {
      headers: {Authorization: `Bearer ${user.token}`}
    })
      .then( user => {
        console.log(user);
        setUser(user.data, 'update');
      })
      .catch( err => {
        console.log(err.response);
      })
  }

/*
  Remove movie from user's favorites
*/
  const removeFromFavorites = movie => {
    axios.delete(`https://my-fav-flix.herokuapp.com/api/users/${user.data.username}/${movie._id}`, {
      headers: {Authorization: `Bearer ${user.token}`}
    })
      .then( user => {
        console.log(user.data);
        setUser(user.data, 'update');
      })
      .catch( err => {
        console.log(err.response);
      })
  }

  return ( 

    <div className="wrapper w-100">

      <Container fluid className="hero">
        <Image src="../../assets/img/denise-jans-Lq6rcifGjOU-unsplash.jpg" />
      </Container>

      <Container className="movie-view p-4">
        <Row className="d-flex">
          <Col className="movie-image col-4 d-flex flex-column"> 
            <img className="align-self-center" src={ movie.imageURL } alt="Movie image"/>
          </Col>
          <Col ol={8} >
            <div className="movie-title"> 
              <span className="label" >Title: </span>
              <span className="value">{ movie.title }</span> 
            </div>
            <div className="movie-genre"> 
              <span className="label">Genre: </span>
              <Link to={`../genre/${movie.genre.name}`}>
                <span className="value">
                  { movie.genre.name }
                </span>
              </Link>
            </div>
            <div className="movie-description"> 
              <span className="label">Description: </span>
              <span className="value">{ movie.description }</span>
            </div>
            <div className="movie-description"> 
              <span className="label">Director: </span>
              <Link to={`../director/${movie.director.name}`}>
                <span className="value">
                  { movie.director.name }
                </span>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>

      <ControlsBar movie={movie} 
        addToFavorites={ movie => {addToFavorites(movie)}  } 
        removeFromFavorites={ movie => {removeFromFavorites(movie)} } 
        onBackClick={onBackClick}/>
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

export default connect(mapStateToProps, { setUser, addToFavorites, removeFromFavorites })(MovieView);