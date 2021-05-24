// Modules
import React, { useState } from 'react'
import PropTypes from 'prop-types'



// React-bootstrap Components
import { Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser, deleteProfile } from '../../actions/actions'

// Styles
import './navBar.scss'

const mapStateToProps = state => {
  const { user } =  state;
  return { user };
}
function NavBar({ user, setUser , deleteProfile }){

    /*

    Logout

  */
  const logOut = () => {
    localStorage.clear();
    setUser({
      user: null,
      token: null
    });
    window.open('/', '_self');
  } 

  return (
    <Navbar className="navbar d-flex justify-content-between text-light px-5 py-3" >
      <Navbar.Brand className="text-light" href="/">MyFlix</Navbar.Brand>

      <div className="d-flex align-items-center">
        <Link to="../profile" className="px-4">My List</Link>
        <Button onClick={logOut}>Sign Out</Button>
      </div>
    </Navbar>
 
  );
}

NavBar.propTypes = {
  user: PropTypes.object,
  onLogOut: PropTypes.func
}

export default connect(mapStateToProps, { setUser, deleteProfile })(NavBar);