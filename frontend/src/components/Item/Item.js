import React from 'react';
import styles from './Item.module.css';
import { Card } from 'react-bootstrap';
import Button from '../Button/Button';

const Item = ({ item, img, price, click }) => {
  return (
    <div className={styles.Item}>
      <Card>
        <img src={img} alt={item} />
        <h2>{item}</h2>
        <p>Price: {price}</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Button variant='dark' text='Add to cart' click={click} />
        </div>
      </Card>
    </div>
  );
};

export default Item;
