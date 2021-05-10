import React, { useState } from 'react';



// React-bootstrap Components
import { Navbar, Form, Nav, FormControl, Button } from 'react-bootstrap';


export function NavBar(props){
  const { user } = props;

  return (
   
      <Navbar className="bg-light px-4 py-3 mb-4" >
        <Navbar.Brand href="/">MyFlix</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
        Signed in as: 
        <a href="/">
          { ` ${user}` }
        </a>
        </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
 
  );
}