// Modules
import React from 'react';
import PropTypes from 'prop-types';

// Styles 
import './movieView.scss';

export class MovieView extends React.Component {

  //Custom Component Methods
  keyPressCallback(e) {
    alert(e.key);
  }

  // Required Render Method (Element)
  render() {
    const { movie, onBackClick } = this.props;


    return ( 
      <div className="movie-view">
        <div className="movie-image"> 
          <img src={ movie.imageURL } alt="Movie image"/>
        </div>
        <div className="movie-title"> 
          <span className="label" >Title: </span>
          <span className="value">{ movie.title }</span> 
        </div>
        <div className="movie-description"> 
          <span className="label">Description: </span>
          <span className="value">{ movie.description }</span>
        </div>
        <button onClick={() => {onBackClick(null)}}>Back</button>
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
  onBackClick: PropTypes.func.isRequired
}