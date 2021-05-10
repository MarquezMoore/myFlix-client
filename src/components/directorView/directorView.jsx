import React, { useState } from 'react';
import PropType from 'prop-types';

// React-bootstrap components 
import { NavBar } from 'react-bootstrap';

export function DirectorView(props) {
  const { director } = props;
  return (
    <>
      <div>{director.name}</div>
      <div>{director.bio}</div>
      <div>{director.birthday}</div>
      <div>{director.deathday}</div>
    </>
  )
}