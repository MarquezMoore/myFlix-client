// Modules
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// External Components
import { MovieCard } from '../movieCard/movieCard';
import { MovieView } from '../movieView/movieView';
import { LoginView } from '../loginView/loginView';
import { RegistrationView } from '../registrationView/registrationView';

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
    if(!user) return <LoginView onLoggedIn={ user => {this.onLoggedin(user)} } />;


    // The there are no movies in the movies list, return message stated so (add in above logic)
    if(movies.length === 0) return <div className="main-view">There are no movies listed</div>;

    // If there is no selected movie, return the home page (MovieView)
    return selectedMovie
      ? 
    (
      <div className="main-view">
        <Row>
          <Col md={8} >
            <MovieView movie={selectedMovie} onBackClick={ newSelectedMovie => {this.setSelectedMovie(newSelectedMovie)}}/>
          </Col>
        </Row>
        
      </div>
    )
      :
    (
      <div className="main-view">
        { 
          movies.map( 
            movie => <MovieCard key={movie._id} movie={movie} onMovieClick={ movie => {this.setSelectedMovie(movie)} }/> 
          ) 
        }
      </div>
    );
  }

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