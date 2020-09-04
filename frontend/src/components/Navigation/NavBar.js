import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import img from '../../assets/img/acousticguitar.jpg';
import NavLink from './NavLink/NavLink';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(({ userLogged }) => userLogged);

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
    <Nav.Item key='4'>
      <NavLink to='Logout' />
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
