import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Guitars from '../containers/Guitars/Guitars';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Account from '../containers/Account/Account';
import Cart from '../containers/Cart/Cart';
import Checkout from '../containers/Checkout/Checkout';

const Routes = ({ user, setUser }) => {
  return (
    <Switch>
      <Route path='/guitars/' component={Guitars} />
      <Route path='/cart' component={Cart} />
      <Route path='/login' component={Login} />
      <Route path='/account'>
        {user ? <Account /> : <Redirect to='/login' />}
      </Route>
      <Route path='/checkout'>
        {user ? <Checkout /> : <Redirect to='/login' />}
      </Route>
      <Route path='/logout'>
        {user ? setUser(null) && <Redirect to='/' /> : <Redirect to='/' />}
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
