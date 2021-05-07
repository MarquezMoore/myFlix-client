// Modules
import React from 'react';
import axios from 'axios';
import { BroswerRouter as Router, Route } from 'react-router-dom';  
import PropTypes from 'prop-types';

// Custom Components
import { MovieList } from '../movieList/movieList';
import { MovieView } from '../movieView/movieView';
import { LoginView } from '../loginView/loginView';
import { RegistrationView } from '../registrationView/registrationView';
import { DirectorView } from '../directorView/directorView'; 
import { GenreView } from '../genreView/genreView'

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

    // return (
    //   <Row className="reg-view min-vh-100">
    //     <Col className="d-flex justify-content-center align-items-center">
    //       <RegistrationView />
    //     </Col>
    //   </Row>
    // );

    return (
      <Router>
        <Row>
        {/* The path prop in the Route component below defines the path the the particular route will match and the render prop define the component to render when matched*/}
        {/* MainView */}
          <Route path="/" render={
            () => {
              if(!user) return (
                <Col className="d-flex w-100 justify-content-center" >
                  <LoginView onLoggedIn={ user => {this.onLoggedin(user)} } />
                </Col>
              );

              return movies.map(movie => (
                <Col xs={6} lg={2} key={movie._id}>
                  <MovieList movie={movie} />
                </Col>
              ))
            }
          } />
        {/* MovieView route */}
          <Route path="api/movie/:movieID" render={
            ( { match, history } ) => {
              if (!movie) return (
                <div>No moviesfound</div>
              )

              return (
                <Col>
                  <MovieView movie={movie.find( m => m.name = match.params.name )} onBackClick={() => history.goBack()}/>
                </Col>
              )
            }
          } />
        {/* DirectorView Route */}
          <Route path="" render={
            ( { match } ) => {
              if ( !movie ) return (
                <div>No moviesfound</div>
              )

              return (
                <Col>
                  <DirectorView director={movies.find( m => m.director.name = match.params.director).Director}/>
                </Col>
              )
            }
          } />
        {/* GenreVoew */}
          <Route path="" render={
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

// MainView.propTypes= {
//   user: PropType.shape({
//     user: PropType.string.isRequired,
//     token: PropType.string.isRequired
//   }),

// }
