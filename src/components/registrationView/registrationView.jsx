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
    [ pError, setpError ] = useState(''),
    [ eError, seteError ] = useState(''),
    [ uError, setuError ] = useState(''),
    [ submit, allowSubmit ] = useState(false),
    [ errors, setErrors ] = useState(''),
    [ show, setShow ] = useState(false);
  

  // Form Input Validation
  const handleChange = e => {
    const input = e.target.name,
      val = e.target.value;

    switch(input) {
      case 'username':
      setUsername(val);
      validate(input, val)
      break;
      case 'password': 
      setPassword(val);
      validate(input, val)
      break;
      case 'email': 
      setEmail(val);
      validate(input, val);
      break;
      case 'birthday': 
      setBirthday(val);
      validate(input, val);
      break;
    }
  }

  const validate = (input, val) => {
    switch(input) {
      case 'password': 
        if(val.length === 0){
          setpError('Please enter a password')
          return allowSubmit(false);;
        }
        if(val.length < 8) {
          setpError('Password must be at least 8 caracters');
          return allowSubmit(false);
        }
        setpError('');
        break;

      case 'email': 
        if(val.length === 0){
          seteError('Please email fictitious email address');
          return allowSubmit(false);
        }
        if( val.indexOf('@') === -1 ) {
          seteError('Email must contain @')
          return allowSubmit(false);
        }
        if( val.indexOf('.') === -1 ){
          seteError('Email must contain "."');
          return allowSubmit(false);
        }
        if(val.indexOf('.test') === -1){
          seteError('Please enter fictitious email address ending with ".test"');
          return allowSubmit(false);
        }
        seteError('');
        break;

      case 'username': 
        if(val.length < 5){
          setuError('Username must be at least 5 characters');
          return allowSubmit(false);
        }
        setuError('');
        break;
    }


  }

  // Function to post new user
  const handleSubmit = e => {
    e.preventDefault();

    console.log({
      "username": username,
      "password": password,
      "email": email,
      "firstName": firstName,
      "lastName": lastName,
      "birdthday": birthday
    })
    
    axios.post('https://my-fav-flix.herokuapp.com/api/users', 
      {
        "username": username,
        "password": password,
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "birdthday": birthday
      }
    ).then( results => {
      console.log(results.data)
    }).catch( err => {
      const result = err.response.data.Error;
      console.log(err.response.data)
      const errs = [];

      
      result.map( e => {
        errs.push(e.msg);
      })
      setErrors(errs);
      setShow(true);
    })

  }


  return(
    <Form onSubmit={ e => handleSubmit(e) } className="col-6 col-lg-4 reg-form bg-light p-4">
      <div className="form-heading text-center mt-2 mb-4 fw-lighter">
        Set up your account
      </div>
      <Alert className="err-msg" variant="danger" role="alert" show={show} >{errors}</Alert>
      {/* Name */}
      <Form.Row className="Row">
        {/* FirstName */}
        <Form.Group as={Col}>
          <Form.Label htmlFor="firstName">First Name: </Form.Label>
          <Form.Control 
          type="text" 
          name="firstName" 
          placeholder="John" 
          value={ firstName } 
          onChange={ e => setFirstName(e.target.value)}/>
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
          type="text" 
          name="username" 
          placeholder="JohnDoe123" 
          value={ username } 
          onChange={ e => handleChange(e)}
        />
        <Form.Text className="text-danger">{ uError }</Form.Text>
      </Form.Group>
      {/* Email */}
      <Form.Group>
        {/* Check this email against data to see if it is used */}
        <Form.Label htmlFor="email">Email:</Form.Label> 
        <Form.Control 
          type="email" 
          name="email" 
          placeholder="johndoe@domain.com"
          value={ email } 
          onChange={ e => handleChange(e)}
        />
        <Form.Text className="text-danger">{ eError }</Form.Text>
      </Form.Group>
      {/* Password */}
      <Form.Group>
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control 
          type="password" 
          name="password" 
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          value={ password } 
          onChange={ e => handleChange(e)}
        />
        <Form.Text className="text-danger">{pError}</Form.Text>
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
      <Button disabled={submit} className="submit button btn-lg fw-light align-self-center w-100 mt-2" variant="primary" type="submit" > 
      Create Free Account
      </Button>
      <Form.Text className="sign-in text-center pt-3">Already have an account? <Link className="link" to="/">Sign In</Link></Form.Text>
    </Form>
  );
}