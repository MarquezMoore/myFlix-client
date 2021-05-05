// Modules
import React, { useState } from 'react';
import PropType from 'prop-types';
import axios from 'axios';


// React-Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

// Styles 
import './loginView.scss';

export function LoginView(props) {
  // Functional component state creation via the useState hook
  const [ username, setUsername] = useState('');
  const [ password, setPassword] = useState('');

  // Event handeler function on form submit
  const handleSubmit = e => {
    // Prevent the submit button from reloading the page on submit
    e.preventDefault();
    console.log(`username: ${username}, Password: ${password}`);

    axios.post('https://my-fav-flix.herokuapp.com/login', {
        Username: username, 
        Password: password
      })
      .then(result => {
        // console.log(`Result: ${result.data}`)
        const data = result.data;
        props.onLoggedIn(data);
      })
      .catch( err => {
        console.log(err.stack);
        console.log('No such user...'); // Review return error message from server
      })
  }

  return (
    <Form className="login-form d-flex flex-column p-4 bg-light shadow" action="" >
      <div className="form-heading text-center fs-3 mt-2 mb-4 fw-light">
        Log in to your account
      </div>
      {/* Input Group */}
      <Form.Group>
        <Form.Label className="">Username</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="username-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7B0708" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={ username }
            onChange={ e => {setUsername(e.target.value)} }
          />
        </InputGroup>
      </Form.Group>
      

      <Form.Group controlId="password">
        <Form.Label>Password </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="password-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7B0708" className="bi bi-lock-fill" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              </svg>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="password" 
            value={ password } 
            onChange={ e => {setPassword(e.target.value)} }
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Form.Group>

      <Button className="button btn-lg fw-light align-self-center w-100 mt-2" variant="primary" type="submit" onClick={ handleSubmit }> 
      Log In
      </Button>
    </Form> 
  )

}

LoginView.prototype = {
  username: PropType.string.isRequired,
  password: PropType.string.isRequired
}

