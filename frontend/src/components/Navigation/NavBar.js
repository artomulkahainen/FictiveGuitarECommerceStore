import React from 'react';
import { Navbar } from 'react-bootstrap';
import img from '../../assets/img/acousticguitar.jpg';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import userService from '../../services/userService';
import { clearUserDetails } from '../../store/actions/userDetailsActions';
import { clearOrders } from '../../store/actions/userOrdersActions';
import { setAlert, removeAlert } from '../../store/actions/alertActions';
import { logoutUser } from '../../store/actions/userLoggedActions';
import { useHistory } from 'react-router-dom';
import uniqid from 'uniqid';
import Button from '../Button/Button';

const NavBar = () => {
  const user = useSelector(({ userLogged }) => userLogged);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    // CLEAR WEB BROWSER STORAGE
    window.localStorage.clear();

    // CLEAR TOKEN
    userService.setToken(null);

    // CLEAR PREVIOUS USER DETAILS
    dispatch(logoutUser());
    dispatch(clearUserDetails());
    dispatch(clearOrders());

    // DISPATCH ALERTS
    const alertId = uniqid();
    dispatch(
      setAlert({
        id: alertId,
        type: 'success',
        message: 'Successfully logged out.',
      })
    );
    setTimeout(() => {
      dispatch(removeAlert(alertId));
    }, 5000);

    // REDIRECT TO HOME PAGE
    history.push('/');
  };

  const notUserNavItems = [
    <NavLink key='1' to='Guitars'>
      <Button variant='light' text='Guitars' />
    </NavLink>,
    <NavLink key='2' to='Cart'>
      <Button variant='light' text='Cart' />
    </NavLink>,
    <NavLink key='3' to='Login'>
      <Button variant='light' text='Login' />
    </NavLink>,
  ];

  const userNavItems = [
    <NavLink key='1' to='Guitars'>
      <Button variant='light' text='Guitars' />
    </NavLink>,
    <NavLink key='2' to='Cart'>
      <Button variant='light' text='Cart' />
    </NavLink>,
    <NavLink key='3' to='Account'>
      <Button variant='light' text='Account' />
    </NavLink>,
    <NavLink key='4' to='#'>
      <Button variant='light' text='Logout' click={() => logout()} />
    </NavLink>,
  ];

  return (
    <div style={{ padding: '10px' }}>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Brand>
          <img
            alt=''
            src={img}
            width='30'
            height='30'
            className='d-inline-block align-top'
          />
        </Navbar.Brand>
        <Navbar.Collapse className='justify-content-end'>
          {!user ? notUserNavItems : userNavItems}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
