import React, { useState } from 'react';

export function LoginView(props) {
  const [ username, setUsername] = userState('');
  const [ password, setPassword] = userState('');

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