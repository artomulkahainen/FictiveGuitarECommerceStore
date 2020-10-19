import React from 'react';
import { Table } from 'react-bootstrap';
import uniqid from 'uniqid';

const OrdersSummary = ({ data, guitarData }) => {
  return (
    <div>
      {data ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Purchase time</th>
              <th>Total price</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, index) => (
              <tr key={uniqid()}>
                <td>{index + 1}</td>
                <td>{`${el.purchaseTime.substring(
                  0,
                  10
                )}, ${el.purchaseTime.substring(11, 19)}`}</td>
                <td>{`${el.totalPrice.toFixed(2)}€`}</td>
                <td>
                  {el.products
                    .map((product) => {
                      const gtr = guitarData.find(
                        (guitar) => guitar.id === product.product
                      );
                      return `${gtr.title} x ${product.quantity}`;
                    })
                    .join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>You haven't purchased anything yet!</p>
      )}
    </div>
  );
};

export default OrdersSummary;
