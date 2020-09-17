import React from 'react';
import DetailsForm from './DetailsForm/DetailsForm';
import { useSelector } from 'react-redux';

const Account = () => {
  const userData = useSelector(({ userDetails }) => userDetails);
  console.log(userData);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 'auto',
        width: '50%',
      }}>
      <h3 style={{ textAlign: 'center' }}>Details</h3>
      <div>
        <DetailsForm data={userData ? userData : null} />
      </div>
    </div>
  );
};

export default Account;
