import React, { useState } from 'react'
import axios from 'axios'
import { PropTypes } from 'prop-types'

import { connect } from 'react-redux'

import { Form, Image, Button} from 'react-bootstrap'
import { setUser } from '../../actions/actions'
import './sideBar.scss'

const mapStateToProps = state => {
  const { user } = state;
  return { user };
}

const SideBar = ({ setUser, user }) => {
  const [ hidden, setHidden ] = useState(''),
    [ username, setUsername ] = useState(''),
    [ email, setEmail ] = useState(''),
    [ firstName, setFirstName ] = useState(''),
    [ lastName, setLastName ] = useState(''),
    [ birthday, setBirthday ] = useState('');

  const handleClick = () => {
    hidden === '' ? setHidden('hidden') : setHidden('');
  }

  const handleSave = () => {
    let user = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthday: birthday
    }
    // Update profile with axios 
    updateSave(user);

    hidden === '' ? setHidden('hidden') : setHidden('');
  }


/*
  update user record
*/
const updateUser =  user => {
  let currentUser = localStorage.getItem('user');
  let token = localStorage.getItem('token');
  console.log(user);
  axios.put(`https://my-fav-flix.herokuapp.com/api/users/${currentUser}`,{
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthday: user.birthday
  }, {
    headers: {Authorization: `Bearer ${token}`}
  })
  .then( user => {
    setUser(user);
  })
  .catch( err => {
    console.log(err);
  })
}

  return (
    <div className="shadow border-end side-bar flex-1 d-flex flex-column h-100 overflow-hidden p-4">
      <div className="d-flex flex-column">
        <Image fluid className="profile-image align-self-center" src="https://via.placeholder.com/1000" alt="Profile Image"/>
        <div className="py-4 d-flex flex-column">
          <span className="fs-4 user-name">{`${user.data.firstName} ${user.data.lastName}`}</span>
          <span className="fs-5 user-username">{user.data.username}</span>
        </div>

        <Form hidden={!hidden} className="update-form" >
            <Form.Group>
              <Form.Control 
              type="text" 
              placeholder={user.data.firstName} 
              value={ firstName } 
              onChange={  e => setFirstName(e.target.value) }/>
            </Form.Group>
            <Form.Group>
              <Form.Control 
              type="text" 
              placeholder={`${user.data.lastName}`} 
              value={ lastName }
              onChange={  e => setLastName(e.target.value) }/>
            </Form.Group>
            <Form.Group>
              <Form.Control 
              type="text" 
              placeholder={`Username ${user}`} 
              value={ username }
              onChange={  e => setUsername(e.target.value) }/>
            </Form.Group>
            <Form.Group>
              <Form.Control 
              type="email" 
              placeholder={user.data.email} 
              value={ email }
              onChange={  e => setEmail(e.target.value) }/>
            </Form.Group>
            <Form.Group>
              <Form.Control 
              type="text" 
              placeholder={user.data.birthday} 
              value={ birthday }
              onChange={  e => setBirthday(e.target.value) }/>
            </Form.Group>
            <div className="d-flex">
              <Button hidden={!hidden} onClick={handleClick} className="cancel-edit me-2 align-self-center w-100 edit-profile">Cancel</Button>
              <Button hidden={!hidden} onClick={handleSave} className="save-edit ms-2 align-self-center w-100 edit-profile">Save</Button>
            </div>
        </Form>

        <Button hidden={hidden} onClick={handleClick} className="align-self-center w-100 edit-profile">Edit Profile</Button>
      </div>
    </div>
  );
}

SideBar.prototype = {
  user: PropTypes.object.isRequire,
}

export default connect(mapStateToProps, { setUser })(SideBar);