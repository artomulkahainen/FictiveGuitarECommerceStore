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
import { setAlert, removeAlert } from '../../store/reducers/alertReducer';

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
      userService.setToken(user.token);

      // DISPATCH USER LOGIN
      dispatch(loginUser(user));

      // DISPATCH USER DETAILS
      dispatch(getUserDetails());

      // DISPATCH ALERTS
      dispatch(
        setAlert({ type: 'success', message: `Welcome ${username.value}!` })
      );
      setTimeout(() => {
        dispatch(removeAlert());
      }, 5000);

      // CLEAR FIELDS
      username.value = '';
      password.value = '';

      // REDIRECT TO HOME PAGE
      history.push('/');
    } catch (exception) {
      // DISPATCH ALERTS
      dispatch(
        setAlert({
          type: 'danger',
          message: `Username or password invalid. Did you write your credentials correctly?`,
        })
      );
      setTimeout(() => {
        dispatch(removeAlert());
      }, 5000);
    }
  };

  return (
    <div
      className={classes.Login}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '1000px',
      }}>
      <LoginForm onSubmit={onSubmit} username={username} password={password} />
      <Button
        text='Create account'
        variant='info'
        click={() => history.push('/createaccount')}
      />
    </div>
  );
};

export default Login;
