import React from 'react';
import { Form, Col } from 'react-bootstrap';
import Spinner from '../../../components/SpinnerItem/SpinnerItem';
import { useDispatch } from 'react-redux';
import Button from '../../../components/Button/Button';
import useField from '../../../hooks/useField';
import userService from '../../../services/userService';
import { updateUserDetails } from '../../../store/reducers/userDetailsReducer';

const DetailsForm = ({ data }) => {
  const dispatch = useDispatch();

  const email = useField('email', data.email);
  const fullName = useField('text', data.details.name);
  const address = useField('text', data.details.address);
  const zipCode = useField('text', data.details.zipCode);
  const city = useField('text', data.details.city);
  const phoneNumber = useField('text', data.details.phoneNumber);

  const formSendHandler = async (event) => {
    event.preventDefault();
    const newObject = {
      //username: username.value,
      email: email.value,
      details: {
        name: fullName.value,
        address: address.value,
        zipCode: zipCode.value,
        city: city.value,
        phoneNumber: phoneNumber.value,
      },
    };
    try {
      // UPDATE USER DETAILS IN MONGODB
      await userService.modifyUserDetails(newObject);

      // DISPATCH NEW USER DETAILS TO REDUX
      dispatch(updateUserDetails(newObject));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {data ? (
        <div>
          <Form onSubmit={formSendHandler}>
            <Form.Group controlId='formGridEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                onChange={email.onChange}
                value={email.value}
              />
            </Form.Group>

            <Form.Group controlId='formGridName'>
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type='text'
                onChange={fullName.onChange}
                value={fullName.value}
              />
            </Form.Group>

            <Form.Group controlId='formGridAddress1'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                onChange={address.onChange}
                value={address.value}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='text'
                  onChange={city.onChange}
                  value={city.value}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridZip'>
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                  type='text'
                  onChange={zipCode.onChange}
                  value={zipCode.value}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId='formGridName'>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='text'
                onChange={phoneNumber.onChange}
                value={phoneNumber.value}
              />
            </Form.Group>

            <Button variant='primary' type='submit' text='Update' />
          </Form>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default DetailsForm;
