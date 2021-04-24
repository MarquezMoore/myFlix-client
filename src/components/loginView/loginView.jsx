// Modules
import React, { useState } from 'react';
import PropType from 'prop-types';


// React-Bootstrap Components
import From from 'react-bootstrap/From';
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
    <From className="login-form" action="">
      <label>
        Username:
        <input type="text" name="username" value={ username } onChange={ e => {setUsername(e.target.value)} } />
      </label>
      <label>
        Password
        <input type="password" name="password" value={ password } onChange={ e => {setPassword(e.target.value)} } />
      </label>
      <Button type="submit" onClick={ handleSubmit } >Submit</Button>
    </From>
  )

}

LoginView.prototype = {
  username: PropType.string.isRequired,
  password: PropType.string.isRequired
}