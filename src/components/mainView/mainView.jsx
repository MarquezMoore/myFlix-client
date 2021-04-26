// Modules
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Custom Components
import { MovieCard } from '../movieCard/movieCard';
import { MovieView } from '../movieView/movieView';
import { LoginView } from '../loginView/loginView';
import { RegistrationView } from '../registrationView/registrationView';

// React-Bootstrap Components

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Stlyes
import './mainView.scss';


export class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedin(user) {
    this.setState({
      user: user
    });
  }
  

  render() {
    const { movies, selectedMovie, user } = this.state;

    // If there is no user logged in, render the this view
    if(!user) return (
      <Row className="login-view flex-grow-1 align-items-center justify-content-center">
        <Col className="login-card" >
          <LoginView  onLoggedIn={ user => {this.onLoggedin(user)} } />
        </Col>
      </Row>
     
    );

    



    // The there are no movies in the movies list, return message stated so (add in above logic)
    if(movies.length === 0) return <div className="main-view">There are no movies listed</div>;

    // If there is no selected movie, return the home page (MovieView)
    return (
      <Row className="main-view ">
        {selectedMovie
          ? 
            <Col md={8} >
              <MovieView movie={selectedMovie} onBackClick={ newSelectedMovie => {this.setSelectedMovie(newSelectedMovie)}}/>
            </Col>
          :
            movies.map( movie => (
              <Col >
                <MovieCard key={movie._id} movie={movie} onMovieClick={ newSelectedMovie => {this.setSelectedMovie(newSelectedMovie)} }/> 
              </Col>
            ))
        }
      </Row>
    );
  };


  componentDidMount() {
    axios.get('https://my-fav-flix.herokuapp.com/api/movies')
      .then(result => {
        this.setState({ movies: result.data })
      }).catch(err => {
        console.log(err);
      })
  }
}



// No props are passed to the MainView from the index.jsx files thus I have not defined the PropTypes 