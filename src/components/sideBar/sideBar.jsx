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

/*
  update user record
*/
  const updateUser = () => {
    console.log(user);
    axios.put(`https://my-fav-flix.herokuapp.com/api/users/${user.data.username}`,{
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthday: user.birthday
    }, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then( user => {
      console.log(user)
      setUser(user);
      hidden === '' ? setHidden('hidden') : setHidden('');
    })
    .catch( err => {
      console.log(err);
    })
  }

  const deleteUser = () => {
    axios.delete(`https://my-fav-flix.herokuapp.com/api/users/${user.data.username}`, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then( result => {
      localStorage.clear();
      setUser({
        user: null,
        token: null
      });
      window.open('/', '_self');
    })
    .catch( err => {
      console.log(err);
    })
  }


  return (
    <div className="shadow border-end side-bar flex-1 d-flex flex-column h-100 overflow-hidden p-5">
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
              <Button hidden={!hidden} onClick={updateUser} className="save-edit ms-2 align-self-center w-100 edit-profile">Save</Button>
            </div>
        </Form>

        <Button hidden={hidden} onClick={handleClick} className="align-self-center w-100 edit-profile">Edit Profile</Button>
        <Button onClick={deleteUser} className="align-self-center w-100 edit-profile my-4">Delete Profile</Button>
      </div>
    </div>
  );
}

SideBar.prototype = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { setUser })(SideBar);