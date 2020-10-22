import React from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { MdAdd, MdRemove, MdDelete } from 'react-icons/md';
import {
  addItem,
  deleteItem,
  removeItemCompletely,
} from '../../store/actions/cartActions';

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
      {cartData.selectedItems.length !== 0 ? (
        <Table striped bordered hover style={{ width: '40%' }}>
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
      ) : (
        <p>No items in cart yet!</p>
      )}
    </div>
  );
};

export default Cart;
