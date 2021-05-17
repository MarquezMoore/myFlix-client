import React, { useState } from 'react'
import axios from 'axios'

import { Form, Image, Button} from 'react-bootstrap'

import './sideBar.scss'

const SideBar = ({ user, updateUser }) => {
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
    updateUser(user);

    hidden === '' ? setHidden('hidden') : setHidden('');
  }

  return (
    <div className="shadow border-end side-bar flex-1 d-flex flex-column h-100 overflow-hidden p-4">
      <div className="d-flex flex-column">
        <Image fluid className="profile-image align-self-center" src="https://via.placeholder.com/1000" alt="Profile Image"/>
        <div className="py-4 d-flex flex-column">
          <span className="fs-4 user-name">{`${user.firstName} ${user.lastName}`}</span>
          <span className="fs-5 user-username">{user.username}</span>
        </div>

        <Form hidden={!hidden} className="update-form" >
            <Form.Group>
              <Form.Control 
              type="text" 
              placeholder={user.firstName} 
              value={ firstName } 
              onChange={  e => setFirstName(e.target.value) }/>
            </Form.Group>
            <Form.Group>
              <Form.Control 
              type="text" 
              placeholder={`${user.lastName}`} 
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
              placeholder={user.email} 
              value={ email }
              onChange={  e => setEmail(e.target.value) }/>
            </Form.Group>
            <Form.Group>
              <Form.Control 
              type="text" 
              placeholder={user.birthday} 
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

export default SideBar