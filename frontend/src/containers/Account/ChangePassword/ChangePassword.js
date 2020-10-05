import React from 'react';
import useField from '../../../hooks/useField';
import { Form } from 'react-bootstrap';
import Button from '../../../components/Button/Button';

const ChangePassword = () => {
  const oldPassword = useField('password', '');
  const newPassword = useField('password', '');
  const newPasswordAgain = useField('password', '');

  return (
    <div>
      <h3>Change password</h3>
      <Form>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Old Password'
            value={oldPassword.value}
            onChange={oldPassword.onChange}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={newPassword.value}
            onChange={newPassword.onChange}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>New Password again</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={newPasswordAgain.value}
            onChange={newPasswordAgain.onChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit' text='Submit' />
      </Form>
    </div>
  );
};

export default ChangePassword;
