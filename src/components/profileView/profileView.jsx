// Module
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Component 
import axios from 'axios'

// React-bootdtrap components 
import { Button } from 'react-bootstrap'

function  ProfileView({ user, token, onBackClick }) {
  const [ userDetails, setUserDetails] = useState([]);
 
  const fetchDetails = () => {

    axios.get(`https://my-fav-flix.herokuapp.com/api/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then( u => {
        console.log(u.data);
        setUserDetails(u.data);
      })
      .catch( err => {
        console.log(err)
      })
  }
  
  useEffect( () => {
    fetchDetails();
  },[])

  const handleLogOut = () => {
    props.onLogOut();
  }

  return(
    <>
    <div >
      {`Username: ${userDetails.username}`}
    </div>
    <div >
      {`First Name: ${userDetails.firstName}`}
    </div>
    <div >
      {`Last Name: ${userDetails.lastName}`}
    </div>
    <div >
      {`Email: ${userDetails.email}`}
    </div>
    <div >
      {`Birthday: ${userDetails.birthday ? userDetails.birthday : 'n/a'}`}
    </div>
    <Button onClick={handleLogOut}></Button>
    <button onClick={onBackClick}>Back</button>
    </>
  )
}

ProfileView.prototypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  onBackClick: PropTypes.func
}

export default ProfileView;