// Modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


// React-Bootstrap Components
import { Form, Button, InputGroup, FormControl, Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Styles 
import './loginView.scss';

export function LoginView(props) {
  // Functional component state creation via the useState hook
  const [ username, setUsername ] = useState(''),
    [ password, setPassword ] = useState(''),
    [ validated, setValidated  ] = useState(false),
    [ errors, setErrors ] = useState('');

  // Event handeler function on form submit
  const handleSubmit = e => {
    // Prevent the submit button from reloading the page on submit
    e.preventDefault();
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true)

    axios.post('https://my-fav-flix.herokuapp.com/login', {
        Username: username, 
        Password: password
      })
      .then(result => {
        const data = result.data;
        props.onLoggedIn(data);
      })
      .catch( err => {
        console.log(err.response.data)
        setErrors(typeof err.response.data.message === 'string' ? err.response.data.message : err.response.data.message.message);
      })
  }

  return (
    <Form className="col-6 col-lg-4 login-form d-flex flex-column p-5 bg-light shadow" action="" noValidate validated={validated}>
      <div className="form-heading text-center mt-2 mb-4 fw-light">
        Log in to your account
      </div>
      <Alert className="err-msg border border-danger" variant="danger" role="alert" show={errors} >
        <p className="m-0">{errors}</p>
      </Alert>
      {/* Input Group */}
      <Form.Group>
        <Form.Label className="">Username:</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="username-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7B0708" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            required
            type="text"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={ username }
            onChange={ e => {setUsername(e.target.value)} }
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please provide your username</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      

      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="password-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7B0708" className="bi bi-lock-fill" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              </svg>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            required
            type="password" 
            value={ password } 
            onChange={ e => {setPassword(e.target.value)} }
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please provide your password</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Button className="button btn-lg fw-light align-self-center w-100 mt-2" variant="primary" type="submit" onClick={ handleSubmit }> 
      Log In
      </Button>
      <Form.Text className="sign-up text-center pt-3">New to MyFlix? <Link className="link" to="/register">Sign Up</Link></Form.Text>
    </Form> 
  )

}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}

