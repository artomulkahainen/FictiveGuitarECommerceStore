import React from 'react';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { setAlert, removeAlert } from '../../../store/actions/alertActions';
import * as yup from 'yup';
import Button from '../../../components/Button/Button';
import { useDispatch } from 'react-redux';
import userService from '../../../services/userService';
import uniqid from 'uniqid';

const ChangePassword = ({ componentToggle }) => {
  const dispatch = useDispatch();
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

  const passwordChangeHandler = async (values) => {
    // CHECK THAT NEW PASSWORDS MATCH
    const alertId = uniqid();
    if (values.newPassword === values.newPasswordAgain) {
      const newPasswordObject = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };

      // PUT OLD AND NEW PASSWORD TO MONGODB
      const res = await userService.changePassword(newPasswordObject);

      // IF RESPONSE WAS SUCCESSFUL:
      if (!res.error) {
        // DISPATCH SUCCESS ALERTS
        dispatch(
          setAlert({
            id: alertId,
            type: 'success',
            message: `Successfully changed password!`,
          })
        );
        setTimeout(() => {
          dispatch(removeAlert(alertId));
        }, 5000);

        // HIDE COMPONENT
        //console.log(componentToggle.current);
        componentToggle.current.toggleOff();

        // IF RESPONSE IS ERROR, DISPATCH ALERTS
      } else {
        dispatch(
          setAlert({
            id: alertId,
            type: 'danger',
            message: `${res.error}`,
          })
        );
        setTimeout(() => {
          dispatch(removeAlert(alertId));
        }, 5000);
      }

      // IF NEW PASSWORDS DON'T MATCH, DISPATCH ALERTS
    } else {
      dispatch(
        setAlert({
          id: alertId,
          type: 'danger',
          message: `The new passwords don't match!`,
        })
      );
      setTimeout(() => {
        dispatch(removeAlert(alertId));
      }, 5000);
    }
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
