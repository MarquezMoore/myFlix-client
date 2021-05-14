// Module
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Component 
import axios from 'axios'

// React-bootdtrap components 
import { Container, Row, Col, Form, Button} from 'react-bootstrap'

import './profileView'

function  ProfileView({ user, token, onBackClick, onLogOut}) {
  const [ userDetails, setUserDetails] = useState([]),
    [ newUsername, setNewUsername] = useState(''),
    [ newFirstName, setNewFirstName] = useState(''),
    [ newLastName, setNewLastName] = useState(''),
    [ newEmail, setNewEmail] = useState(''),
    [ newBirthday, setNewBirthday] = useState(''),
    [ profileForm, setProfileForm ] = useState('hidden');


  
  const fetchDetails = () => {
    axios.get(`https://my-fav-flix.herokuapp.com/api/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then( u => {
        setUserDetails(u.data);
      })
      .catch( err => {
        console.log(err)
      })
  }
  
  useEffect( () => {
    fetchDetails();
  },[ ])

  const handleSave = () => {
    axios.put(`https://my-fav-flix.herokuapp.com/api/users/${user}`,
    {
      data: {
        username: newUsername,
        email: newEmail,
        firstName: newFirstName,
        lastName: newLastName,
        birthday: newBirthday
      }
    },
    {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then( result => {
      // Close the form 
      console.log(result);
    })
    .catch( err => {
      console.log(err);
    })
  }

  const deleteUser = () => {
    axios.delete(`https://my-fav-flix.herokuapp.com/api/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then( result => {
      onLogOut();
      console.log(result.data);
    })
    .catch( err => {
      console.log(err);
    })
  }


  return(
    <div className="wrapper d-flex flex-grow-1">
{/* User Profile Overview */}
      <div className="profileOverview bg-dark">
        <p>hello world</p>
      </div>


{/* User Favorite Movie List */}
      <Container className="userMovies">
        <div>Movies</div>
        {`${userDetails.movies ? userDetails.movies: 'You have no movies in your favorites'}`}
        <Button className="btn-light border-dark mr-2 " onClick={onBackClick}>Back</Button>
        <Button className="btn-danger ml-2"onClick={deleteUser}>Remove Account</Button>
      </Container>
    </div>
      

  )
}

ProfileView.prototypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  onBackClick: PropTypes.func,
  onLogOut: PropTypes.func,
}

export default ProfileView;