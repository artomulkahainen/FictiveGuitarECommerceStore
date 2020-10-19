import React from 'react';
import { Link } from 'react-router-dom';

const style = {
  color: 'white',
  padding: '10px',
  borderStyle: 'solid',
  boxShadow: '0.5px 0.5px 3px 2px #d8d8d8c5',
  textDecoration: 'none',
  fontFamily: 'Helvetica Neue',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 24px',
  textAlign: 'justify',
  textJustify: 'inter-word',
};

const NavLink = ({ to }) => {
  return (
    <div style={{ marginRight: '10px' }}>
      <Link to={`/${to ? to.toLowerCase() : ''}`} style={style}>
        {!to ? 'Logout' : to}
      </Link>
    </div>
  );
};

export default NavLink;
