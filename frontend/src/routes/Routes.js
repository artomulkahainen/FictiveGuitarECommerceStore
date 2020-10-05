import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Guitars from '../containers/Guitars/Guitars';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import { checkUser } from '../store/reducers/userLoggedReducer';
import userService from '../services/userService';
import Account from '../containers/Account/Account';
import CreateAccount from '../containers/Account/CreateAccount/CreateAccount';
import Cart from '../containers/Cart/Cart';
import Checkout from '../containers/Checkout/Checkout';
import { clearUserDetails } from '../store/reducers/userDetailsReducer';
import { setAlert, removeAlert } from '../store/reducers/alertReducer';

const Routes = () => {
  const user = useSelector(({ userLogged }) => userLogged);
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    // CLEAR WEB BROWSER STORAGE
    window.localStorage.clear();

    // CLEAR TOKEN
    userService.setToken(null);

    // CLEAR PREVIOUS USER DETAILS
    dispatch(checkUser(null));
    dispatch(clearUserDetails());

    // DISPATCH ALERTS
    dispatch(
      setAlert({ type: 'success', message: 'Successfully logged out.' })
    );
    setTimeout(() => {
      dispatch(removeAlert());
    }, 5000);

    // REDIRECT TO HOME PAGE
    history.push('/');
  };

  return (
    <Switch>
      <Route path='/guitars' component={Guitars} />
      <Route path='/cart' component={Cart} />
      <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
      <Route path='/account'>
        {user ? <Account /> : <Redirect to='/login' />}
      </Route>
      <Route path='/checkout'>
        {user ? <Checkout /> : <Redirect to='/login' />}
      </Route>
      <Route path='/createaccount'>
        {!user ? <CreateAccount /> : <Redirect to='/' />}
      </Route>
      <Route path='/logout'>
        {user ? (
          () => {
            logout();
            return null;
          }
        ) : (
          <Redirect to='/' />
        )}
      </Route>
      <Route path='/' component={Home} />
    </Switch>
  );
};

export default Routes;
