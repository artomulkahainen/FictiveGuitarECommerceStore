import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import img from '../../assets/img/acousticguitar.jpg';
import NavLink from './NavLink/NavLink';
import { useSelector, useDispatch } from 'react-redux';
import userService from '../../services/userService';
import { clearUserDetails } from '../../store/actions/userDetailsActions';
import { clearOrders } from '../../store/actions/userOrdersActions';
import { setAlert, removeAlert } from '../../store/actions/alertActions';
import { checkUser } from '../../store/actions/userLoggedActions';
import { useHistory } from 'react-router-dom';
import uniqid from 'uniqid';

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
    dispatch(checkUser(null));
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
    <Nav.Item key='1'>
      <NavLink to='Guitars' />
    </Nav.Item>,
    <Nav.Item key='2'>
      <NavLink to='Cart' />
    </Nav.Item>,
    <Nav.Item key='3'>
      <NavLink to='Login' />
    </Nav.Item>,
  ];

  const userNavItems = [
    <Nav.Item key='1'>
      <NavLink to='Guitars' />
    </Nav.Item>,
    <Nav.Item key='2'>
      <NavLink to='Cart' />
    </Nav.Item>,
    <Nav.Item key='3'>
      <NavLink to='Account' />
    </Nav.Item>,
    <Nav.Item key='4' onClick={() => logout()}>
      <NavLink />
    </Nav.Item>,
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
