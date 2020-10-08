import React, { useState, useImperativeHandle } from 'react';
import Button from '../../components/Button/Button';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleOff = () => {
    setVisible(false);
  };

  const onClick = (otherComponents) => {
    // IF OTHER COMPONENTS ARE VISIBLE, HIDE THEM
    if (otherComponents) {
      otherComponents.forEach((el) => el.current.toggleOff());
    }
    setVisible(true);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleOff,
    };
  });

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
        <Button
          text={props.buttonText1}
          click={() => onClick(props.otherComponents)}
        />
      )}
    </div>
  );
});

export default Togglable;
