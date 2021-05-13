// Modules
import React, { useState } from 'react'
import PropTypes from 'prop-types'



// React-bootstrap Components
import { Navbar, Form, Nav, FormControl, Button } from 'react-bootstrap'

// Styles
import './navBar.scss'


function NavBar({ user, onLogOut }){
  return (
   
      <Navbar className="navbar text-light px-4 py-2 mb-4" >
        <Navbar.Brand className="text-light" href="/">MyFlix</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="text-light">
        Signed in as: 
        <a className="text-light" href="/profile">
          { user }
        </a>
        </Navbar.Text>
        <Button onClick={onLogOut}>Sign Out</Button>
        </Navbar.Collapse>
      </Navbar>
 
  );
}

NavBar.propTypes = {
  user: PropTypes.string,
  onLogOut: PropTypes.func
}

export default NavBar;