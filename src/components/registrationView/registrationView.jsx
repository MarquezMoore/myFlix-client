import React, { useState } from 'react';
import propType from 'prop-types';



export function Registration(props) {
  const [ user, setUser ] = userState('');

  return(
    <form className="reg-form" action="">
      <label htmlFor="firstName">
        First Name:
        <input type="text" name="firstName"/>
      </label>
      <label htmlFor="lastName">
        Last Name:
        <input type="text" name="lastName"/>
      </label>
      <label htmlFor="username">
        Username:
        <input type="text" name="username"/>
      </label>
      <label htmlFor="password">
        Password:
        <input type="password" name="password"/>
      </label>
      <label htmlFor="email">
        Email:
        <input type="text" name="email"/>
      </label>
      <label htmlFor="birthday">
        Date of Birth:
        <input type="text" name="birthday"/>
        </label>
    </form>
  );
}