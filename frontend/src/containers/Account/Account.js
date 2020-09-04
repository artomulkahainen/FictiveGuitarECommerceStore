import React from 'react';
import { useSelector } from 'react-redux';
import {} from 'react-bootstrap';

const Account = () => {
  const userData = useSelector(({ userDetails }) => userDetails);
  console.log(userData);
  return (
    <div>
      <h3>Details</h3>
      <form>
        {userData ? <input>{userData.username}</input> : null}
        {userData ? <input>{userData.details.name}</input> : null}
      </form>
    </div>
  );
};

export default Account;
