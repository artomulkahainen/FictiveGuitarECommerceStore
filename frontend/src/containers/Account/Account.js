import React from 'react';
import DetailsForm from './DetailsForm/DetailsForm';
import { useSelector } from 'react-redux';
import Togglable from '../Togglable/Togglable';
import ChangePassword from './ChangePassword/ChangePassword';

const Account = () => {
  const userData = useSelector(({ userDetails }) => userDetails);

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
        <Togglable buttonText2='Cancel' buttonText1='Your orders'>
          <p>Here will be your orders!</p>
        </Togglable>
        <Togglable buttonText2='Cancel' buttonText1='Edit account details'>
          <DetailsForm data={userData ? userData : null} />
        </Togglable>
        <Togglable buttonText2='Cancel' buttonText1='Change password'>
          <ChangePassword handler={changePasswordHandler} />
        </Togglable>
      </div>
    </div>
  );
};

export default Account;
