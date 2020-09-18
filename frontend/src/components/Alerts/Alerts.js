import React from 'react';
import { Alert } from 'react-bootstrap';
import uniqid from 'uniqid';

const Alerts = ({ type, message }) => (
  <Alert key={uniqid()} variant={type}>
    {message}
  </Alert>
);

export default Alerts;
