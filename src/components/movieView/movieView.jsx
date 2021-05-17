// Modules
import React from 'react'
import PropTypes from 'prop-types'

// React-router-dom Components 
import { Link } from 'react-router-dom'

// React-bootstrap components 
import { Button } from 'react-bootstrap'

import ControlsBar from '../controlsBar/controlsBar'


// Styles 
import './movieView.scss'

export class MovieView extends React.Component {

  //Custom Component Methods
  keyPressCallback(e) {
    alert(e.key);
  }

  // Required Render Method (Element)
  render() {
    const { movie, onBackClick, addToFavorites, removeFromFavorites } = this.props;

    return ( 

      <div className="wrapper w-100 p-4">
        
        

        <ControlsBar onBackClick={onBackClick}/>

        <div className="movie-view">
        <div className="movie-image"> 
          <img src={ movie.imageURL } alt="Movie image"/>
        </div>
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
      </div>
     



      </div>
    );
  }

  // Lifecycle FMethods
  componentDidMount() {
    document.addEventListener('keydown', this.keyPressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyPressCallback);
  }
 
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired
  }).isRequired,
  addToFavorties: PropTypes.func,
  onBackClick: PropTypes.func.isRequired
}