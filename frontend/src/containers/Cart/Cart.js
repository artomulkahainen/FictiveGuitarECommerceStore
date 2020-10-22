import React, { useState } from 'react';
import { Table, Modal } from 'react-bootstrap';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { MdAdd, MdRemove, MdDelete } from 'react-icons/md';
import {
  addItem,
  deleteItem,
  removeItemCompletely,
} from '../../store/actions/cartActions';
import { useHistory } from 'react-router-dom';
import ordersService from '../../services/ordersService';
import { removeAlert, setAlert } from '../../store/actions/alertActions';
import { clearCart } from '../../store/actions/cartActions';
import { updateOrders } from '../../store/actions/userOrdersActions';

const Cart = ({ userLogged }) => {
  const dispatch = useDispatch();
  const cartData = useSelector(({ cart }) => cart);
  const history = useHistory();

  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const postOrderHandler = async () => {
    handleModalClose();
    const alertId = uniqid();

    // CREATE SUITABLE ORDER OBJECT FOR BACKEND
    const orderObject = {
      products: cartData.selectedItems.map((el) => {
        return { product: el.id, quantity: el.quantity };
      }),
      totalPrice: cartData.totalPrice.toFixed(2),
    };

    // SEND ORDER TO BACKEND
    const res = await ordersService.postOrder(orderObject);

    // IF RES IS SUCCESSFUL
    if (!res.error) {
      // DISPATCH SUCCESS ALERTS
      dispatch(
        setAlert({
          id: alertId,
          type: 'success',
          message: 'Order was successful!',
        })
      );
      setTimeout(() => {
        dispatch(removeAlert(alertId));
      }, 5000);

      // UPDATE USER'S OWN ORDERS STATE
      dispatch(
        updateOrders({
          products: res.products.map((el) => {
            return { product: el.product.id, quantity: el.quantity };
          }),
          totalPrice: res.totalPrice,
          user: res.user.id,
          purchaseTime: res.purchaseTime,
          id: res.id,
        })
      );

      // CLEAR CART
      dispatch(clearCart());

      // MOVE BACK TO FRONT PAGE
      history.push('/');

      // IF THERE WAS AN ERROR WITH RES, DISPATCH ERROR ALERTS
    } else {
      dispatch(
        setAlert({
          id: alertId,
          type: 'danger',
          message: res.error,
        })
      );
      setTimeout(() => {
        dispatch(removeAlert(alertId));
      }, 5000);
    }
  };

  const checkoutModal = (
    <Modal show={modalShow} onHide={handleModalClose} keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title>Order confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You're about the order items below:</p>
        <ul>
          {cartData.selectedItems.map((el) => (
            <li key={uniqid()}>{`${el.title} x ${el.quantity}`}</li>
          ))}
        </ul>
        <p>{`Total price: ${cartData.totalPrice.toFixed(2)}€`}</p>
        <strong>
          <p>Hit "Order now!" if everything is correct!</p>
        </strong>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' click={handleModalClose} text='Cancel' />
        <Button variant='success' text='Order now!' click={postOrderHandler} />
      </Modal.Footer>
    </Modal>
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {cartData.selectedItems.length > 0 ? (
        <div style={{ width: '40%' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th style={{ width: '10%' }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartData.selectedItems.map((el) => (
                <tr key={uniqid()}>
                  <th>{el.title}</th>
                  <th style={{ width: '10%' }}>
                    {el.quantity}
                    {
                      <MdAdd
                        style={{
                          marginLeft: '3px',
                          color: 'green',
                          cursor: 'pointer',
                        }}
                        onClick={() =>
                          dispatch(
                            addItem({
                              id: el.id,
                              title: el.title,
                              price: el.price,
                            })
                          )
                        }
                      />
                    }
                    {
                      <MdRemove
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() =>
                          dispatch(
                            deleteItem({
                              id: el.id,
                              title: el.title,
                              price: el.price,
                            })
                          )
                        }
                      />
                    }
                    {
                      <MdDelete
                        style={{ marginLeft: '3px', cursor: 'pointer' }}
                        onClick={() =>
                          dispatch(
                            removeItemCompletely({
                              id: el.id,
                              title: el.title,
                              price: el.price,
                            })
                          )
                        }
                      />
                    }
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3 style={{ color: 'red', textAlign: 'center' }}>Total price:</h3>
          <h1
            style={{
              color: 'green',
              textDecoration: 'underline',
              textAlign: 'center',
            }}>
            {cartData.totalPrice.toFixed(2)}€
          </h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Button
              text={!userLogged ? 'LOGIN TO ORDER' : 'ORDER NOW'}
              variant='dark'
              isDisabled={!userLogged}
              click={handleModalShow}
            />
          </div>
          {checkoutModal}
        </div>
      ) : (
        <p>No items in cart yet!</p>
      )}
    </div>
  );
};

export default Cart;
