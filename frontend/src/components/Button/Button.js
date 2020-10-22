import React from 'react';
import { Button } from 'react-bootstrap';
import classes from './Button.module.css';

const button = ({ text, variant, click, style, type, isDisabled }) => {
  return (
    <Button
      className={classes.Button}
      variant={variant}
      onClick={click}
      disabled={isDisabled}
      type={type}>
      {text}
    </Button>
  );
};

export default button;
