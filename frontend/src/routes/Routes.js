import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Guitars from '../containers/Guitars/Guitars';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Account from '../containers/Account/Account';
import CreateAccount from '../containers/Account/CreateAccount/CreateAccount';
import Cart from '../containers/Cart/Cart';

const Routes = () => {
  const user = useSelector(({ userLogged }) => userLogged);

  return (
    <Switch>
      <Route path='/guitars' component={Guitars} />
      <Route path='/cart'>
        <Cart userLogged={user} />
      </Route>
      <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
      <Route path='/account'>
        {user ? <Account /> : <Redirect to='/login' />}
      </Route>
      <Route path='/createaccount'>
        {!user ? <CreateAccount /> : <Redirect to='/' />}
      </Route>
      <Route path='/' component={Home} />
    </Switch>
  );
};

export default Routes;
