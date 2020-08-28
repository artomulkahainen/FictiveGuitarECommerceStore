import React from 'react';
import { Button } from 'react-bootstrap';

const button = ({ text, variant, click, style }) => {
  return (
    <Button style={{ textAlign: 'center' }} variant={variant} onClick={click}>
      {text}
    </Button>
  );
};

export default button;
