// Modules
import React, { useState } from 'react';
import propType from 'prop-types';
import axios from 'axios';

// React-Bootstrap Components
import { Form, Button, Col, Alert } from 'react-bootstrap/';
import { Link } from 'react-router-dom';

// Styles
import './registrationView.scss';



export function RegistrationView(props) {
  const [ username, setUsername ] = useState(''),
    [ password, setPassword ] = useState(''),
    [ email, setEmail ] = useState(''),
    [ firstName, setFirstName ] = useState(''),
    [ lastName, setLastName ] = useState(''),
    [ birthday, setBirthday ] = useState(''),
    [ errors, setErrors ] = useState([]),
    [ show, setShow ] = useState(false),
    [ validated, setValidated] = useState(false);
  

  // Function to post new user
  const handleSubmit = e => {
    e.preventDefault();
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    
    setValidated(true);
    
    // Post user to data base
    axios.post('https://my-fav-flix.herokuapp.com/api/users', 
      {
        "username": username,
        "password": password,
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "birdthday": birthday
      }
    )
    .then( user => {
      (user.data)
      window.open('/', '_self');
    })
    .catch( err => {
      setErrors(err.response.data);
      setShow(true);
    })
  }


  return(
    <Form onSubmit={handleSubmit} className="col-6 col-lg-4 reg-form bg-light p-4" noValidate validated={validated}>
      <div className="form-heading text-center mt-2 mb-4 fw-lighter">
        Set up your account
      </div>
      <Alert 
        className="err-msg border border-danger" variant="danger" role="alert" show={show} >
          {errors.map( (e, i) => (
            <ul className="m-0 px-1" key={i}><li>{e.msg}</li></ul>
          ))}
      </Alert>
      {/* Name */}
      <Form.Row className="Row">
        {/* FirstName */}
        <Form.Group as={Col}>
          <Form.Label htmlFor="firstName">First Name: </Form.Label>
          <Form.Control 
          required
          type="text" 
          name="firstName" 
          placeholder="John" 
          value={ firstName } 
          onChange={ e => setFirstName(e.target.value)}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please provide your first name</Form.Control.Feedback>
        </Form.Group>
      {/* LastName */}
        <Form.Group as={Col} >
          <Form.Label htmlFor="lastName">Last Name: </Form.Label>
          <Form.Control 
          type="text" 
          name="lastName" 
          placeholder="Doe" 
          value={ lastName } 
          onChange={ e => setLastName(e.target.value)}/>
        </Form.Group>
      </Form.Row>
      {/* Username */}
      <Form.Group>
        {/* Check this email against data to see if it is used */}
        <Form.Label htmlFor="username">Username:</Form.Label>
        <Form.Control 
          required
          type="text" 
          name="username" 
          placeholder="JohnDoe123" 
          value={ username } 
          onChange={ e => setUsername(e.target.value)}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please a username</Form.Control.Feedback>
      </Form.Group>
      {/* Email */}
      <Form.Group>
        {/* Check this email against data to see if it is used */}
        <Form.Label htmlFor="email">Email:</Form.Label> 
        <Form.Control
          required 
          type="email" 
          name="email" 
          placeholder="johndoe@domain.com"
          value={ email } 
          onChange={ e => setEmail(e.target.value)}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please provide an email</Form.Control.Feedback>
      </Form.Group>
      {/* Password */}
      <Form.Group>
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control
          required 
          type="password" 
          name="password" 
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          value={ password } 
          onChange={ e => setPassword(e.target.value)}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please provide password</Form.Control.Feedback>
      </Form.Group>
      {/* Birthday */}
      <Form.Group>
        <Form.Label htmlFor="birthday">Birthday: </Form.Label>
        <Form.Control 
          type="text" 
          name="birthday" 
          placeholder="DD/MM/YYYY"
          value={ birthday } 
          onChange={ e => setBirthday(e.target.value)}/>
      </Form.Group>
      <Button className="submit button btn-lg fw-light align-self-center w-100 mt-2" variant="primary" type="submit" > 
      Create Free Account
      </Button>
      <Form.Text className="sign-in text-center pt-3">Already have an account? <Link className="link" to="/">Sign In</Link></Form.Text>
    </Form>
  );
}