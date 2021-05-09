// Modules
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// React components
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';  

// Custom Components
import { MovieList } from '../movieList/movieList';
import { MovieView } from '../movieView/movieView';
import { LoginView } from '../loginView/loginView';
import { RegistrationView } from '../registrationView/registrationView';
import { DirectorView } from '../directorView/directorView'; 
import { GenreView } from '../genreView/genreView'

// React-Bootstrap Components
import { Row, Col } from 'react-bootstrap';

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

  onLoggedin(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });


    localStorage.setItem('user', authData.user.username);
    localStorage.setItem('token', authData.token);

    this.getMovies(authData.token);
  }

  getMovies(token){
    axios.get('https://my-fav-flix.herokuapp.com/api/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then( result => {
      this.setState({
        movies: result.data
      })
    })
    .catch( err => {
      console.log(err); 
    })
  }

  onLoggeOut() {
    localStorage.clear();
    this.setState({
      user: null
    });
  } 
  

  render() {
    const { movies, selectedMovie, user } = this.state;

    return (
      <Router>
        <Row>
        {/* The path prop in the Route component below defines the path the the particular route will match and the render prop define the component to render when matched*/}
        
        {/* Main View Route */}
          <Route exact path="/" render={
            () => {
              if(!user) return (
                <Col className="login-view d-flex min-vh-100 justify-content-center align-items-center" >
                  <LoginView  onLoggedIn={ user => {this.onLoggedin(user)} } />
                </Col>
              );

              if ( movies.length === 0 ){
                return <div>No movies found</div>
              }

              return movies.map(m => (
                <Col xs={6} lg={2} key={m._id}>
                  <MovieList movie={m} />
                </Col>
              ))
            }
          } />

        {/* Registration View Route */}
          <Route path="/register" render={ () => {
            // If user is logged in already redirect to login view 
            if(user) return <Redirect to="/" />


            return(
              <Col className="reg-view min-vh-100 d-flex justify-content-center align-items-center">
                <RegistrationView />
              </Col>
            )
          }}/>

        {/* Movie View route */}
          <Route path="/movie/:movieID" render={
            ( { match, history } ) => {
              

              return (
                <Col>
                  <MovieView movie={movie.find( m => m.name = match.params.name )} onBackClick={() => history.goBack()}/>
                </Col>
              )
            }
          } />
        {/* DirectorView Route */}
          <Route path="/director/:director-id" render={
            ( { match } ) => {
              if ( movies.length === 0 ){
                return <div>No movies found</div>
              }
              

              return (
                <Col>
                  <DirectorView director={movies.find( m => m.director.name = match.params.director).Director}/>
                </Col>
              )
            }
          } />
        {/* Genre View Route*/}
          <Route path="/genre/:genre-id" render={
            () => {
              return (
                <Col>
                  <GenreView />
                </Col>
              )
            }
          } />
        </Row>
      </Router>
    );
  };


  componentDidMount() {
    // Retrive the JWT from the applications localStorage
    let accessToken = localStorage.getItem('token');
    // The there is a token in the apps localStorage update the user state to the user in stored in the localStorage
    if(accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      // Display movies
      this.getMovies(accessToken);
    }
  }
}


