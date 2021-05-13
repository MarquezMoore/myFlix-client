import React from 'react';
import PropTypes from 'prop-types';

// React-bootstrap components 
import { NavBar } from 'react-bootstrap';

function DirectorView({ director, onBackClick }) {
  return (
    <>
      <div>{director.name}</div>
      <div>{director.bio}</div>
      <div>{director.birthday}</div>
      <div>{director.deathday}</div>
      <button onClick={onBackClick}>Back</button>
    </>
  )
}

DirectorView.prototypes = {
  director: PropTypes.object,
  onBackClick: PropTypes.func
}

export default DirectorView;