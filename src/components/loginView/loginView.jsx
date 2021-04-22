// Modules
import React, { useState } from 'react';
import PropType from 'prop-types';

export function LoginView(props) {
  const [ username, setUsername] = useState('');
  const [ password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault;
    console.log(username, password);

    props.onLoggedIn(username);
  }

  return (
    <form className="login-form" action="">
      <label>
        Username:
        <input type="text" name="username" value={ username } onChange={ e => {setUsername(e.target.value)} } />
      </label>
      <label>
        Password
        <input type="password" name="password" value={ password } onChange={ e => {setPassword(e.target.value)} } />
      </label>
      <button type="submit" onClick={ handleSubmit } >Submit</button>
    </form>
  )

}

LoginView.prototype = {
  username: PropType.string.isRequired,
  password: PropType.string.isRequired
}