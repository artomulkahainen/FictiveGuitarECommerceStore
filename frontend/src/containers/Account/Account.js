import React, { useRef } from 'react';
import DetailsForm from './DetailsForm/DetailsForm';
import { useSelector } from 'react-redux';
import Togglable from '../Togglable/Togglable';
import ChangePassword from './ChangePassword/ChangePassword';
import OrdersSummary from './OrdersSummary/OrdersSummary';

const Account = () => {
  const userData = useSelector(({ userDetails }) => userDetails);
  const ordersRef = useRef();
  const detailsRef = useRef();
  const passwordRef = useRef();

  const changePasswordHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 'auto',
        width: '50%',
      }}>
      <h2 style={{ textAlign: 'center' }}>Account page</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}></div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Togglable
          buttonText2='Cancel'
          buttonText1='Your orders'
          otherComponents={[passwordRef, detailsRef]}
          ref={ordersRef}>
          <OrdersSummary />
        </Togglable>
        <Togglable
          buttonText2='Cancel'
          buttonText1='Edit account details'
          otherComponents={[passwordRef, ordersRef]}
          ref={detailsRef}>
          <DetailsForm
            data={userData ? userData : null}
            componentToggle={detailsRef}
          />
        </Togglable>
        <Togglable
          buttonText2='Cancel'
          buttonText1='Change password'
          otherComponents={[detailsRef, ordersRef]}
          ref={passwordRef}>
          <ChangePassword
            handler={changePasswordHandler}
            componentToggle={passwordRef}
          />
        </Togglable>
      </div>
    </div>
  );
};

export default Account;
