import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/Navigation/NavBar';
import Routes from './routes/Routes';
import { initGuitars } from './store/actions/guitarActions';
import { checkUser } from './store/actions/userLoggedActions';
import userService from './services/userService';
import { getUserDetails } from './store/actions/userDetailsActions';
import { initOrders } from './store/actions/userOrdersActions';
import Alert from './components/Alerts/Alerts';

const App = () => {
  const dispatch = useDispatch();
  const alertMessage = useSelector(({ alert }) => alert);

  // CHECK IF USER ALREADY LOGGED IN. IF USER IS LOGGED, DISPATCH USER AND USER DETAILS
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userService.setToken(user.token);
      dispatch(checkUser(user));
      dispatch(getUserDetails());
      dispatch(initOrders());
    }
  }, [dispatch]);

  // GET GUITARS DATA FROM BACKEND
  useEffect(() => {
    dispatch(initGuitars());
  }, [dispatch]);

  return (
    <div className='container'>
      <NavBar />
      {!alertMessage ? (
        <br />
      ) : (
        <Alert type={alertMessage.type} message={alertMessage.message} />
      )}
      <Routes />
    </div>
  );
};

export default App;
