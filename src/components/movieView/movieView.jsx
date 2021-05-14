// Modules
import React from 'react'
import PropTypes from 'prop-types'

// React-router-dom Components 
import { Link } from 'react-router-dom'

// React-bootstrap components 
import { Button } from 'react-bootstrap'


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

      <div className="wrapper w-100">
        
        <div className="d-flex w-100 justify-content-center">
          <Button className="me-auto bg-transparent border-0"  onClick={onBackClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-skip-backward-fill" viewBox="0 0 16 16">
              <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z"/>
            </svg>
          </Button>
          <Button className="bg-transparent border-0" onClick={ () => addToFavorites(movie)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
            </svg>
          </Button>
          <Button className="bg-transparent border-0" onClick={ () => removeFromFavorites(movie)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
              <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
            </svg>
          </Button>
        </div>

        

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
  user: PropTypes.string.isRequired,
  addToFavorties: PropTypes.func,
  onBackClick: PropTypes.func.isRequired
}