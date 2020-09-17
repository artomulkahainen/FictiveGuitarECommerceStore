import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useField from '../../hooks/useField';
import classes from './Login.module.css';
import LoginForm from './LoginForm/LoginForm';
import loginService from '../../services/loginService';
import userService from '../../services/userService';
import { loginUser } from '../../store/reducers/userLoggedReducer';
import { getUserDetails } from '../../store/reducers/userDetailsReducer';
import Button from '../Button/Button';

const Login = () => {
  const dispatch = useDispatch();
  const username = useField('text', '');
  const password = useField('password', '');
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // LOGIN USER WITH LOGIN SERVICE
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });

      // STORE DATA IN LOCAL STORAGE AND USER SERVICE
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      userService.setToken(user);

      // DISPATCH USER LOGIN
      dispatch(loginUser(user));

      // DISPATCH USER DETAILS
      dispatch(getUserDetails());

      // CLEAR FIELDS
      username.value = '';
      password.value = '';

      // REDIRECT TO HOME PAGE
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
        flexDirection: 'column',
        alignItems: 'center',
        /*justifyContent: 'center',*/
        height: '1000px',
      }}>
      <LoginForm onSubmit={onSubmit} username={username} password={password} />
      <br />
      <Button
        text='Create account'
        click={() => history.push('/createaccount')}
      />
    </div>
  );
};

export default Login;