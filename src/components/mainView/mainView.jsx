import React from 'react';
import Axios from 'axios';

import { MovieCard } from '../movieCard/movieCard';
import { MovieView } from '../movieView/movieView';


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
        { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
  

  render() {
    const { movies, selectedMovie } = this.state;

    // The there are no movies in the movies list, return message stated so (add in above logic)
    if(movies.length === 0) return <div className="main-view">The list is empty</div>;

    // If there is no selected movie, return the home page
    if (selectedMovie)  return (
      <div className="main-view">
        <MovieView movie={selectedMovie} onBackClick={ newSelectedMovie => {this.setSelectedMovie(newSelectedMovie)}}/>
      </div>
    )
    
    // If a movie is selected and there are movies in the stated the show selected movies content
    return (
      <div className="main-view">
        { 
          movies.map( 
            movie => <MovieCard key={movie._id} movie={movie} onMovieClick={ movie => {this.setSelectedMovie(movie)} }/> 
          ) 
        }
      </div>
    );
    
   
    
    
  }
}