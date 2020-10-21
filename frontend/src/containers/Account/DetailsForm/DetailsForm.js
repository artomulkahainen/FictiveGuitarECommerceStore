import React from 'react';
import { Form, Col } from 'react-bootstrap';
import Spinner from '../../../components/SpinnerItem/SpinnerItem';
import { useDispatch } from 'react-redux';
import Button from '../../../components/Button/Button';
import userService from '../../../services/userService';
import { updateUserDetails } from '../../../store/actions/userDetailsActions';
import { setAlert, removeAlert } from '../../../store/actions/alertActions';
import * as yup from 'yup';
import { Formik } from 'formik';

const DetailsForm = ({ data, componentToggle }) => {
  const dispatch = useDispatch();

  // YUP SCHEMA FOR VALIDATING THE FORMIK FORMS
  const modifyDetailsSchema = yup.object({
    email: yup
      .string()
      .email('Please insert correct email address! (eg. your_name@gmail.com)')
      .required('Email is required!'),
    name: yup.string().required('Your name is required!'),
    address: yup.string().required('Your address is required!'),
    zipCode: yup.string().required('Your zip code is required!'),
    city: yup.string().required('Your city is required!'),
    phoneNumber: yup.string().required('Your phone number is required!'),
  });

  const formSendHandler = async (values) => {
    // CREATE NEW USER DETAIL OBJECT OF GIVEN VALUES
    const newObject = {
      email: values.email,
      details: {
        name: values.name,
        address: values.address,
        zipCode: values.zipCode,
        city: values.city,
        phoneNumber: values.phoneNumber,
      },
    };

    // PUT MODIFIED DETAILS INTO MONGODB
    const res = await userService.modifyUserDetails(newObject);

    // IF PUT WAS SUCCESSFUL:
    if (!res.error) {
      // DISPATCH SUCCESS ALERTS
      dispatch(updateUserDetails(newObject));
      dispatch(
        setAlert({
          type: 'success',
          message: 'User details modified successfully!',
        })
      );
      setTimeout(() => {
        dispatch(removeAlert());
      }, 5000);

      // HIDE COMPONENT
      componentToggle.current.toggleOff();

      // IF ERROR OCCURED DURING PUT, DISPATCH ERROR ALERTS
    } else {
      dispatch(
        setAlert({
          type: 'danger',
          message:
            res.error.codeName === 'DuplicateKey'
              ? 'Email is already taken.'
              : 'Error occured.',
        })
      );
      setTimeout(() => {
        dispatch(removeAlert());
      }, 5000);
    }
  };

  return (
    <div>
      {data ? (
        <div>
          <Formik
            validationSchema={modifyDetailsSchema}
            onSubmit={formSendHandler}
            initialValues={{
              email: data.email,
              name: data.details.name,
              address: data.details.address,
              zipCode: data.details.zipCode,
              city: data.details.city,
              phoneNumber: data.details.phoneNumber,
            }}>
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId='formGridEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    onBlur={handleBlur}
                    isValid={!errors.email && touched.email}
                    onChange={handleChange}
                    value={values.email}
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

                <Form.Group controlId='formGridName'>
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    onBlur={handleBlur}
                    isValid={!errors.name && touched.name}
                    onChange={handleChange}
                    value={values.name}
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

                <Form.Group controlId='formGridAddress1'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    name='address'
                    onBlur={handleBlur}
                    isValid={!errors.address && touched.address}
                    onChange={handleChange}
                    value={values.address}
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
                      type='text'
                      name='city'
                      onBlur={handleBlur}
                      isValid={!errors.city && touched.city}
                      onChange={handleChange}
                      value={values.city}
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
                    <Form.Label>Zip code</Form.Label>
                    <Form.Control
                      type='text'
                      name='zipCode'
                      onBlur={handleBlur}
                      isValid={!errors.zipCode && touched.zipCode}
                      onChange={handleChange}
                      value={values.zipCode}
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
                <Form.Group controlId='formGridName'>
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type='text'
                    name='phoneNumber'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isValid={!errors.phoneNumber && touched.phoneNumber}
                    value={values.phoneNumber}
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

                <Button variant='primary' type='submit' text='Update' />
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default DetailsForm;
