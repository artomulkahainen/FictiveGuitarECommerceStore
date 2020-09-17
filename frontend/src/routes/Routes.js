import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Guitars from '../containers/Guitars/Guitars';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import { checkUser } from '../store/reducers/userLoggedReducer';
import userService from '../services/userService';
import Account from '../containers/Account/Account';
import DetailsForm from '../containers/Account/DetailsForm/DetailsForm';
import CreateAccount from '../containers/Account/CreateAccount/CreateAccount';
import Cart from '../containers/Cart/Cart';
import Checkout from '../containers/Checkout/Checkout';
import { clearUserDetails } from '../store/reducers/userDetailsReducer';

const Routes = () => {
  const user = useSelector(({ userLogged }) => userLogged);
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.clear();
    userService.setToken(null);
    dispatch(checkUser(null));
    dispatch(clearUserDetails());
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
