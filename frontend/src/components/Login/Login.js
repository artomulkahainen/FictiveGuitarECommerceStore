import React from 'react';
import { useHistory } from 'react-router-dom';
import useField from '../../hooks/useField';
import classes from './Login.module.css';
import LoginForm from './LoginForm/LoginForm';
import loginService from '../../services/loginService';
import userService from '../../services/userService';

const Login = () => {
  const username = useField('text');
  const password = useField('password');
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      userService.setToken(user);
      username.value = '';
      password.value = '';
      console.log(user);
      history.push('/');
    } catch (exception) {
      console.log('error with logging in!');
    }
  };
  return (
    <div
      className={classes.Login}
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '1000px',
      }}>
      <LoginForm onSubmit={onSubmit} username={username} password={password} />
    </div>
  );
};

export default Login;
