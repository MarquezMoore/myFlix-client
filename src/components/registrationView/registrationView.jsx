// Modules
import React, { useState } from 'react';
import propType from 'prop-types';

// React-Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

// Styles
import './registrationView.scss';



export function RegistrationView(props) {
  const [ user, setUser ] = useState('');

  return(
    <Form className="reg-form bg-light p-4" action="">
      <div className="form-heading text-center fs-3 mt-2 mb-4 fw-light">
        Set up your account
      </div>
      {/* Name */}
      <Form.Row className="Row">
        {/* FirstName */}
        <Form.Group as={Col} controlId="formGridFname">
          <Form.Label htmlFor="firstName">First Name: </Form.Label>
          <Form.Control type="text" name="firstName" placeholder="John" />
        </Form.Group>
      {/* LastName */}
        <Form.Group as={Col} controlID="formGridLname">
          <Form.Label htmlFor="lastName">Last Name: </Form.Label>
          <Form.Control type="text" name="lastName" placeholder="Doe"/>
        </Form.Group>
      </Form.Row>
      {/* Username */}
      <Form.Group controlId="username">
        <Form.Label htmlFor="username">Username:</Form.Label>
        <Form.Control className="" type="text" name="username" placeholder="JohnDoe123"/>
      </Form.Group>
      {/* Email */}
      <Form.Group controlId="email">
        <Form.Label htmlFor="email">Email:</Form.Label>
        <Form.Control type="email" name="email" placeholder="johndoe@email.com"/>
      </Form.Group>
      {/* Password */}
      <Form.Group controlId="password">
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control type="text" name="password" placeholder="************"/>
      </Form.Group>
      {/* Birthday */}
      <Form.Group controlId="birthday">
        <Form.Label htmlFor="birthday">Birthday: </Form.Label>
        <Form.Control type="text" name="birthday" placeholder="01/23/1977"/>
      </Form.Group>
      <Button className="button btn-lg fw-light align-self-center w-100 mt-2" variant="primary" type="submit" > 
      Create Free Account
      </Button>
    </Form>
  );
}