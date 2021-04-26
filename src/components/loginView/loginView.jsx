// Modules
import React, { useState } from 'react';
import PropType from 'prop-types';


// React-Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

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
    <Card  style={{
      display: 'flex',
      flexDirection: 'row',
      width: '55%',
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
    }}>
      <Card.Img className="w-50" variant="left" src="https://via.placeholder.com/150C/O" />
      <Card.Body style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Form className="login-form d-flex flex-column p-2" action="" >
          <div className="text-center fs-1 pb-2">
            Sign In
          </div>
          <Form.Group controlId="username"> 
            <Form.Label > Username: </Form.Label>
            <Form.Control type="text" name="username" value={ username } onChange={ e => {setUsername(e.target.value)} } />
            <Form.Text>You email will never be shared to anyone esle.</Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" name="password" value={ password } onChange={ e => {setPassword(e.target.value)} } />
          </Form.Group>

          <Button className="button align-self-center w-50 mt-4" variant="primary" type="submit" onClick={ handleSubmit }> 
          Submit 
          </Button>
        </Form> 
      </Card.Body>
    </Card>
  )

}

LoginView.prototype = {
  username: PropType.string.isRequired,
  password: PropType.string.isRequired
}

