import React from 'react';
import Button from '../../Button/Button';

const LoginForm = ({ onSubmit, username, password }) => (
  <form onSubmit={onSubmit} style={{ padding: '20px' }}>
    <span>Username: </span>
    <br />
    <input type='username' onChange={username.onChange}></input>
    <br />
    <span>Password: </span>
    <br />
    <input type='password' onChange={password.onChange}></input>
    <br />
    <Button type='submit' text='LOGIN' />
  </form>
);

export default LoginForm;
