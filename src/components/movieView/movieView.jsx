// Modules
import React from 'react';
import PropTypes from 'prop-types';

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

MovieView.proptype = {
  movie: PropType.shape({
    title: PropType.string.isRequired,
    description: Proptype.string.isRequired,
    imageURL: PropType.string.isRequired
  }).isRequired,
  onBackClick: PropType.func.isRequired
}