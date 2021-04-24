// Modules
import React, { useState } from 'react';
import propType from 'prop-types';

// React-Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Styles
import './registrationView.scss';



export function Registration(props) {
  const [ user, setUser ] = userState('');

  return(
    <From className="reg-form" action="">
      <From.Group controlId="firstName">
        <From.Label htmlFor="firstName">
          First Name:
          <From.Control type="text" name="firstName"/>
        </From.Label>
      </From.Group>

      <From.Group controlId="lastName">
        <From.Label htmlFor="lastName">
          Last Name:
          <From.Control type="text" name="lastName"/>
        </From.Label>
      </From.Group>

      <From.Group controlId="username">
        <From.Label htmlFor="username">
          Username:
          <From.Control type="text" name="username"/>
        </From.Label>
      </From.Group>
    
      <From.Group controlId="password">
        <From.Label htmlFor="password">
          Password:
          <From.Control type="text" name="password"/>
        </From.Label>
      </From.Group>
      
      <From.Group controlId="email">
        <From.Label htmlFor="email">
          Email:
          <From.Control type="email" name="email"/>
        </From.Label>
      </From.Group>
     
      <From.Group controlId="birthday">
        <From.Label htmlFor="birthday">
          Birthday:
          <From.Control type="text" name="birthday"/>
        </From.Label>
      </From.Group>
  
    </From>
  );
}