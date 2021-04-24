// Modules
import React, { useState } from 'react';
import PropType from 'prop-types';


// React-Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    <Form className="login-form" action="">
      <Form.Group controlId="username"> 
        <Form.Label>
          Username:
          <Form.Control type="text" name="username" value={ username } onChange={ e => {setUsername(e.target.value)} } placeholder="Enter username"/>
        </Form.Label>
        <Form.Text>
          You email will never be shared to anyone esle.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="password">
          <Form.Label>
            Password
            <Form.Control type="password" name="password" value={ password } onChange={ e => {setPassword(e.target.value)} } placeholder="Enter username"/>
          </Form.Label>
      </Form.Group>
      <Button type="submit" onClick={ handleSubmit } >Submit</Button>
    </Form>
  )

}

LoginView.prototype = {
  username: PropType.string.isRequired,
  password: PropType.string.isRequired
}