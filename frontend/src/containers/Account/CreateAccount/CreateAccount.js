import React from 'react';
import useField from '../../../hooks/useField';
import { Form, Col } from 'react-bootstrap';
import Button from '../../../components/Button/Button';
import userService from '../../../services/userService';
import { setAlert, removeAlert } from '../../../store/reducers/alertReducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CreateAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const username = useField('username', '');
  const password = useField('password', '');
  const name = useField('name', '');
  const email = useField('email', '');
  const address = useField('address', '');
  const city = useField('city', '');
  const zipCode = useField('zipcode', '');
  const phoneNumber = useField('phonenumber', '');

  const formSendHandler = async (event) => {
    event.preventDefault();

    // CREATE USER OBJECT OF GIVEN VALUES
    const userObject = {
      username: username.value,
      password: password.value,
      email: email.value,
      details: {
        name: name.value,
        address: address.value,
        zipCode: zipCode.value,
        city: city.value,
        phoneNumber: phoneNumber.value,
      },
    };

    // POST USER
    const res = await userService.createUser(userObject);

    // IF CREATE USER FAILED
    if (!res.username) {
      // DISPATCH ALERTS
      dispatch(
        setAlert({
          type: 'danger',
          message: `${res}. Check that all the required fields are inserted.`,
        })
      );
      setTimeout(() => {
        dispatch(removeAlert());
      }, 5000);

      // IF CREATE USER WAS SUCCESSFUL
    } else {
      // DISPATCH ALERTS
      dispatch(
        setAlert({
          type: 'success',
          message: `Successfully created new user: ${res.username}. Please log in to use the service.`,
        })
      );
      setTimeout(() => {
        dispatch(removeAlert());
      }, 5000);

      history.push('/');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <h2>CREATE ACCOUNT</h2>
      <Form onSubmit={formSendHandler}>
        <Form.Row>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='username'
              placeholder='Username'
              value={username.value}
              onChange={username.onChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password.value}
              onChange={password.onChange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder='Your name'
            value={name.value}
            onChange={name.onChange}
          />
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>E-mail address</Form.Label>
          <Form.Control
            placeholder='Your email'
            value={email.value}
            onChange={email.onChange}
          />
        </Form.Group>

        <Form.Group controlId='Address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder='Your address'
            value={address.value}
            onChange={address.onChange}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId='formGridCity'>
            <Form.Label>City</Form.Label>
            <Form.Control
              placeholder='Your city'
              value={city.value}
              onChange={city.onChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridZip'>
            <Form.Label>Zip</Form.Label>
            <Form.Control
              placeholder='Your zipcode'
              value={zipCode.value}
              onChange={zipCode.onChange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId='Phonenumber'>
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            placeholder='Your phone number'
            value={phoneNumber.value}
            onChange={phoneNumber.onChange}
          />
        </Form.Group>

        <Button variant='primary' type='submit' text='Submit' />
        <Button variant='dark' text='Cancel' click={() => history.push('/')} />
      </Form>
    </div>
  );
};

export default CreateAccount;
