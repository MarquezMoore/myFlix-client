// Modules
import React, { useState } from 'react'
import PropTypes from 'prop-types'



// React-bootstrap Components
import { Navbar, Form, Nav, FormControl, Button} from 'react-bootstrap'

// Styles
import './navBar.scss'


function NavBar({ user, onLogOut }){
  const [ toggleDropdown, setToggleDropdown ] = useState('hidden');


  const handleClick = () => {
    setToggleDropdown('')
  }

  return (
      <Navbar className="navbar text-light px-5 py-3" >
        <Navbar.Brand className="text-light" href="/">MyFlix</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end dropdown" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">

        <Button className="bg-transparent border-0 shadow-none p-0" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
        </Button>
        <div hidden={toggleDropdown}>
          Shown
        </div>

        </Navbar.Collapse>
      </Navbar>
 
  );
}

NavBar.propTypes = {
  user: PropTypes.object,
  onLogOut: PropTypes.func
}

export default NavBar;