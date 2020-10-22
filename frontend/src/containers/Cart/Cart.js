import React from 'react';
import { Table } from 'react-bootstrap';
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

const Cart = ({ userLogged }) => {
  const dispatch = useDispatch();
  const cartData = useSelector(({ cart }) => cart);
  const history = useHistory();

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
              click={() => history.push('/checkout')}
            />
          </div>
        </div>
      ) : (
        <p>No items in cart yet!</p>
      )}
    </div>
  );
};

export default Cart;
