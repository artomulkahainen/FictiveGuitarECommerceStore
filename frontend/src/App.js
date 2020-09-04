import React from 'react';
import { useDispatch } from 'react-redux';
import NavBar from './components/Navigation/NavBar';
import Routes from './routes/Routes';
import { useEffect } from 'react';
import { initGuitars } from './store/reducers/guitarReducer';
import { checkUser } from './store/reducers/userLoggedReducer';
import userService from './services/userService';
import { getUserDetails } from './store/reducers/userDetailsReducer';

const App = () => {
  const dispatch = useDispatch();

  // CHECK IF USER ALREADY LOGGED IN. IF USER IS LOGGED, DISPATCH USER AND USER DETAILS
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userService.setToken(user.token);
      dispatch(checkUser(user));
      dispatch(getUserDetails());
    }
  }, [dispatch]);

  // GET GUITARS DATA FROM BACKEND
  useEffect(() => {
    dispatch(initGuitars());
  }, [dispatch]);

  return (
    <div className='container'>
      <NavBar />
      <Routes />
    </div>
  );
};

export default App;
