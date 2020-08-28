import React from 'react';
import lp from '../../assets/img/lp.jpg';
import moran from '../../assets/img/moran.jpg';
import ac2 from '../../assets/img/ac2.jpg';
import tele from '../../assets/img/tele.jpg';
import styles from './Guitars.module.css';
import Item from '../../components/Item/Item';
import Button from '../../components/Button/Button';
//import { useState } from 'react';

const Guitars = () => {
  //const [guitars, setGuitars] = useState([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={styles.Guitars}>
        <Item item='Les Paul' img={lp} price='799.90€' />
        <Item item='Moran' img={moran} price='149.90€' />
        <Item item='Acoustic guitar' img={ac2} price='499€' />
        <Item item='Telecaster' img={tele} price='1199.90€' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant='dark' text='CHECKOUT' />
      </div>
    </div>
  );
};

export default Guitars;
