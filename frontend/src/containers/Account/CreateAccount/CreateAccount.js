import React from 'react';
import useField from '../../../hooks/useField';
import { Form, Col } from 'react-bootstrap';
import Button from '../../../components/Button/Button';
import userService from '../../../services/userService';
import { setAlert, removeAlert } from '../../../store/reducers/alertReducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

const CreateAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const createAccountSchema = yup.object({
    username: yup
      .string()
      .required("Username can't be empty!")
      .max(15, 'Username too long!'),
    password: yup
      .string()
      .required('password is required')
      .min(5, 'password must be at least 5 characters long!'),
    email: yup
      .string()
      .email('Please insert an email!')
      .required('email is required'),
    name: yup.string().required('name is required'),
    address: yup.string().required('address is required'),
    zipCode: yup.string().required('zip code is required'),
    city: yup.string().required('city is required'),
    phoneNumber: yup.string().required('phone number is required'),
  });

  const formSendHandler = async (values) => {
    // CREATE USER OBJECT OF GIVEN VALUES
    const userObject = {
      username: values.username,
      password: values.password,
      email: values.email,
      details: {
        name: values.name,
        address: values.address,
        zipCode: values.zipCode,
        city: values.city,
        phoneNumber: values.phoneNumber,
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
          message: `${res}`,
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
      <Formik
        validationSchema={createAccountSchema}
        onSubmit={formSendHandler}
        initialValues={{
          username: '',
          password: '',
          email: '',
          name: '',
          address: '',
          city: '',
          zipCode: '',
          phoneNumber: '',
        }}>
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          setTouched,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridEmail'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  name='username'
                  placeholder='Username'
                  value={values.username}
                  onChange={handleChange}
                  isValid={!errors.username}
                  style={
                    !errors.username
                      ? { borderStyle: 'solid', borderColor: 'green' }
                      : { borderStyle: 'solid', borderColor: 'red' }
                  }
                />
                {errors.username ? (
                  <p style={{ color: 'red' }}>{errors.username}</p>
                ) : null}
              </Form.Group>

              <Form.Group as={Col} controlId='formGridPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={values.password}
                  onChange={handleChange}
                  isValid={!errors.password}
                  style={
                    !errors.password
                      ? { borderStyle: 'solid', borderColor: 'green' }
                      : { borderStyle: 'solid', borderColor: 'red' }
                  }
                />
                {errors.password ? (
                  <p style={{ color: 'red' }}>{errors.password}</p>
                ) : null}
              </Form.Group>
            </Form.Row>

            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder='Your name'
                name='name'
                value={values.name}
                onChange={handleChange}
                isValid={!errors.name}
              />
              {errors.name ? (
                <p style={{ color: 'red' }}>{errors.name}</p>
              ) : null}
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>E-mail address</Form.Label>
              <Form.Control
                placeholder='Your email'
                name='email'
                value={values.email}
                onChange={handleChange}
                isValid={!errors.email}
              />
            </Form.Group>

            <Form.Group controlId='Address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder='Your address'
                name='address'
                value={values.address}
                onChange={handleChange}
                isValid={!errors.address}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder='Your city'
                  name='city'
                  value={values.city}
                  onChange={handleChange}
                  isValid={!errors.city}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridZip'>
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  placeholder='Your zipcode'
                  name='zipCode'
                  value={values.zipCode}
                  onChange={handleChange}
                  isValid={!errors.zipCode}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId='Phonenumber'>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                placeholder='Your phone number'
                name='phoneNumber'
                value={values.phoneNumber}
                onChange={handleChange}
                isValid={!errors.phoneNumber}
              />
            </Form.Group>

            <Button variant='primary' type='submit' text='Submit' />
            <Button
              variant='dark'
              text='Cancel'
              click={() => history.push('/')}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAccount;
