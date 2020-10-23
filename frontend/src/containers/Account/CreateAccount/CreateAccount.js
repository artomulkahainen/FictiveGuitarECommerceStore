import React from 'react';
import { Form, Col } from 'react-bootstrap';
import Button from '../../../components/Button/Button';
import userService from '../../../services/userService';
import { setAlert, removeAlert } from '../../../store/actions/alertActions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import uniqid from 'uniqid';

const CreateAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // YUP SCHEMA FOR VALIDATING THE FORMIK FORMS
  const createAccountSchema = yup.object({
    username: yup
      .string()
      .matches(
        /^(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
        'White spaces or special characters are not allowed! One letter is also needed.'
      )
      .required("Username can't be empty!")
      .max(15, 'Username too long!')
      .min(3, 'Username too short!'),
    password: yup
      .string()
      .required('Password is required!')
      .min(5, 'Password must be at least 5 characters long!'),
    email: yup
      .string()
      .email('Please insert correct email address! (eg. your_name@gmail.com)')
      .required('Please insert an email address!'),
    name: yup.string().required('Your name is required!'),
    address: yup.string().required('Your address is required!'),
    zipCode: yup.string().required('Your zip code is required!'),
    city: yup.string().required('Your city is required!'),
    phoneNumber: yup.string().required('Your phone number is required!'),
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

    // POST USER TO MONGODB
    const res = await userService.createUser(userObject);
    const alertId = uniqid();
    // IF CREATE USER FAILED, DISPATCH ALERTS
    if (res.error) {
      if (res.error.username) {
        dispatch(
          setAlert({
            id: alertId,
            type: 'danger',
            message: `${res.error.username.message}`,
          })
        );
        setTimeout(() => {
          dispatch(removeAlert(alertId));
        }, 5000);
      } else if (res.error.email) {
        dispatch(
          setAlert({
            id: alertId,
            type: 'danger',
            message: `${res.error.email.message}`,
          })
        );
        setTimeout(() => {
          dispatch(removeAlert(alertId));
        }, 5000);
      } else {
        dispatch(
          setAlert({
            id: alertId,
            type: 'danger',
            message: 'error occured',
          })
        );
        setTimeout(() => {
          dispatch(removeAlert(alertId));
        }, 5000);
      }

      // IF CREATE USER WAS SUCCESSFUL:
    } else {
      // DISPATCH SUCCESS ALERTS
      dispatch(
        setAlert({
          id: alertId,
          type: 'success',
          message: `Successfully created new user: ${res.username}. Please log in to use the service.`,
        })
      );
      setTimeout(() => {
        dispatch(removeAlert(alertId));
      }, 5000);

      // CHANGE CURRENT PAGE BACK TO HOME
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
          handleBlur,
          touched,
          values,
          errors,
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
                  isValid={!errors.username && touched.username}
                  onBlur={handleBlur}
                  style={
                    errors.username && touched.username
                      ? { borderStyle: 'solid', borderColor: 'red' }
                      : null
                  }
                />
                {errors.username && touched.username ? (
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
                  isValid={!errors.password && touched.password}
                  onBlur={handleBlur}
                  style={
                    errors.password && touched.password
                      ? { borderStyle: 'solid', borderColor: 'red' }
                      : null
                  }
                />
                {errors.password && touched.password ? (
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
                isValid={!errors.name && touched.name}
                onBlur={handleBlur}
                style={
                  errors.name && touched.name
                    ? { borderStyle: 'solid', borderColor: 'red' }
                    : null
                }
              />
              {errors.name && touched.name ? (
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
                isValid={!errors.email && touched.email}
                onBlur={handleBlur}
                style={
                  errors.email && touched.email
                    ? { borderStyle: 'solid', borderColor: 'red' }
                    : null
                }
              />
              {errors.email && touched.email ? (
                <p style={{ color: 'red' }}>{errors.email}</p>
              ) : null}
            </Form.Group>

            <Form.Group controlId='Address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder='Your address'
                name='address'
                value={values.address}
                onChange={handleChange}
                isValid={!errors.address && touched.address}
                onBlur={handleBlur}
                style={
                  errors.address && touched.address
                    ? { borderStyle: 'solid', borderColor: 'red' }
                    : null
                }
              />
              {errors.address && touched.address ? (
                <p style={{ color: 'red' }}>{errors.address}</p>
              ) : null}
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder='Your city'
                  name='city'
                  value={values.city}
                  onChange={handleChange}
                  isValid={!errors.city && touched.city}
                  onBlur={handleBlur}
                  style={
                    errors.city && touched.city
                      ? { borderStyle: 'solid', borderColor: 'red' }
                      : null
                  }
                />
                {errors.city && touched.city ? (
                  <p style={{ color: 'red' }}>{errors.city}</p>
                ) : null}
              </Form.Group>

              <Form.Group as={Col} controlId='formGridZip'>
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  placeholder='Your zipcode'
                  name='zipCode'
                  value={values.zipCode}
                  onChange={handleChange}
                  isValid={!errors.zipCode && touched.zipCode}
                  onBlur={handleBlur}
                  style={
                    errors.zipCode && touched.zipCode
                      ? { borderStyle: 'solid', borderColor: 'red' }
                      : null
                  }
                />
                {errors.zipCode && touched.zipCode ? (
                  <p style={{ color: 'red' }}>{errors.zipCode}</p>
                ) : null}
              </Form.Group>
            </Form.Row>

            <Form.Group controlId='Phonenumber'>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                placeholder='Your phone number'
                name='phoneNumber'
                value={values.phoneNumber}
                onChange={handleChange}
                isValid={!errors.phoneNumber && touched.phoneNumber}
                onBlur={handleBlur}
                style={
                  errors.phoneNumber && touched.phoneNumber
                    ? { borderStyle: 'solid', borderColor: 'red' }
                    : null
                }
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <p style={{ color: 'red' }}>{errors.phoneNumber}</p>
              ) : null}
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
