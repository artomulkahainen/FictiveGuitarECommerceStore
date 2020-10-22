import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/Navigation/NavBar';
import Routes from './routes/Routes';
import { initGuitars } from './store/actions/guitarActions';
import { loginUser } from './store/actions/userLoggedActions';
import userService from './services/userService';
import { initUserDetails } from './store/actions/userDetailsActions';
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
      dispatch(loginUser(user));
      dispatch(initUserDetails());
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
      {!alertMessage[0] ? (
        <br />
      ) : (
        <Alert
          type={alertMessage[alertMessage.length - 1].type}
          message={alertMessage[alertMessage.length - 1].message}
        />
      )}
      <Routes />
    </div>
  );
};

export default App;
