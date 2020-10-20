import React from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { MdAdd, MdRemove, MdDelete } from 'react-icons/md';
import {
  addItem,
  deleteItem,
  removeItemCompletely,
} from '../../store/reducers/cartReducer';

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(({ cart }) => cart);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {cartData.length !== 0 ? (
        <Table striped bordered hover style={{ width: '40%' }}>
          <thead>
            <tr>
              <th>Product</th>
              <th style={{ width: '10%' }}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((el) => (
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
                      onClick={() => dispatch(addItem(el))}
                    />
                  }
                  {
                    <MdRemove
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => dispatch(deleteItem(el))}
                    />
                  }
                  {
                    <MdDelete
                      style={{ marginLeft: '3px', cursor: 'pointer' }}
                      onClick={() => dispatch(removeItemCompletely(el))}
                    />
                  }
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No items in cart yet!</p>
      )}
    </div>
  );
};

export default Cart;
