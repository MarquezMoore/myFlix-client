// Modules
import React, { useState } from 'react';
import PropType from 'prop-types';


// React-Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

// Styles 
import './loginView.scss';

export function LoginView(props) {
  const [ username, setUsername] = useState('');
  const [ password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault;
    console.log(username, password);

    props.onLoggedIn(username);
  }

  return (
    <Form className="login-form d-flex flex-column p-5 bg-light shadow" action="" >
      <div className="form-heading text-center fs-3 mt-2 mb-4 fw-light">
        Log in to your account
      </div>
      {/* Input Group */}
      <Form.Group>
        <Form.Label className="">Username:</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="username-icon">@</InputGroup.Text>
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
        <Form.Label>Password: </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="password-icon">X</InputGroup.Text>
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

