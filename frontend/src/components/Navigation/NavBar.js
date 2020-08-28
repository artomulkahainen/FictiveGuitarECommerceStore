import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import img from '../../assets/img/ac2.jpg';
import NavLink from './NavLink/NavLink';

const NavBar = () => {
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
          <Nav.Item>
            <NavLink to='Guitars' />
          </Nav.Item>
          <Nav.Item>
            <NavLink to='Cart' />
          </Nav.Item>
          <Nav.Item>
            <NavLink to='Login' />
          </Nav.Item>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
