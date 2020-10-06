import React from 'react';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from '../../../components/Button/Button';

const ChangePassword = () => {
  // YUP SCHEMA FOR VALIDATING PASSWORD CHANGE IN FORMIK FORMS
  const changePasswordSchema = yup.object({
    oldPassword: yup.string().required("Old password field can't be empty!"),
    newPassword: yup
      .string()
      .min(5, 'Password must be at least 5 characters long!')
      .required("New password field can't be empty!"),
    newPasswordAgain: yup
      .string()
      .min(5, 'Password must be at least 5 characters long!')
      .required("New password field can't be empty!"),
  });

  const passwordChangeHandler = async (event, values) => {
    console.log('hello world! i got these values: ');
    console.log(values.oldPassword);
  };

  return (
    <div>
      <h3>Change password</h3>
      <Formik
        validationSchema={changePasswordSchema}
        onSubmit={passwordChangeHandler}
        initialValues={{
          oldPassword: '',
          newPassword: '',
          newPasswordAgain: '',
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
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type='password'
                name='oldPassword'
                placeholder='Old Password'
                value={values.oldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                style={
                  errors.oldPassword && touched.oldPassword
                    ? { borderStyle: 'solid', borderColor: 'red' }
                    : null
                }
              />
              {errors.oldPassword && touched.oldPassword ? (
                <p style={{ color: 'red' }}>{errors.oldPassword}</p>
              ) : null}
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type='password'
                name='newPassword'
                placeholder='Password'
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={!errors.newPassword && touched.newPassword}
                style={
                  errors.newPassword && touched.newPassword
                    ? { borderStyle: 'solid', borderColor: 'red' }
                    : null
                }
              />
              {errors.newPassword && touched.newPassword ? (
                <p style={{ color: 'red' }}>{errors.newPassword}</p>
              ) : null}
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>New Password again</Form.Label>
              <Form.Control
                type='password'
                name='newPasswordAgain'
                placeholder='Password'
                value={values.newPasswordAgain}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={!errors.newPasswordAgain && touched.newPasswordAgain}
                style={
                  errors.newPasswordAgain && touched.newPasswordAgain
                    ? { borderStyle: 'solid', borderColor: 'red' }
                    : null
                }
              />
              {errors.newPasswordAgain && touched.newPasswordAgain ? (
                <p style={{ color: 'red' }}>{errors.newPasswordAgain}</p>
              ) : null}
            </Form.Group>
            <Button variant='primary' type='submit' text='Update' />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
