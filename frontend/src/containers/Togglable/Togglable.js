import React, { useState } from 'react';
import Button from '../../components/Button/Button';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {visible ? (
        <div>
          {props.children}
          <Button
            variant='dark'
            text={props.buttonText2}
            click={() => setVisible(false)}
          />
        </div>
      ) : (
        <Button text={props.buttonText1} click={() => setVisible(true)} />
      )}
    </div>
  );
};

export default Togglable;
