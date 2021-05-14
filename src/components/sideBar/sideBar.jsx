import React from 'react'

import { Image } from 'react-bootstrap'

import './sideBar.scss'

const SideBar = ({ user }) => {

  return (
    <div className="side-bar flex-1 d-flex flex-column h-100 overflow-hidden p-4">
      <Image rounded fluid className="profile-image align-self-center pb-3" src="https://via.placeholder.com/200" alt="Profile Image"/>
      <h3 className="align-self-center">{user}</h3>
    </div>
  );
}

export default SideBar