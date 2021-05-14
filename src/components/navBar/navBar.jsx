// Modules
import React, { useState } from 'react'
import PropTypes from 'prop-types'



// React-bootstrap Components
import { Navbar, Form, Nav, FormControl, Button } from 'react-bootstrap'

// Styles
import './navBar.scss'


function NavBar({ user, onLogOut }){
  return (
   
      <Navbar className="navbar text-light px-4 py-2" >
        <Navbar.Brand className="text-light" href="/">MyFlix</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Button className="bg-transparent border-0" onClick={onLogOut}>Sign Out</Button>
        </Navbar.Collapse>
      </Navbar>
 
  );
}

NavBar.propTypes = {
  user: PropTypes.string,
  onLogOut: PropTypes.func
}

export default NavBar;