import React from 'react';
import lp from '../../assets/img/lespaul.jpg';
import moran from '../../assets/img/moran.jpg';
import ac2 from '../../assets/img/acousticguitar.jpg';
import tele from '../../assets/img/tele.jpg';
import styles from './Guitars.module.css';
import Item from '../../components/Item/Item';
import Button from '../../components/Button/Button';
import uniqid from 'uniqid';

const Guitars = ({ guitarData }) => {
  const images = {
    'les paul': lp,
    ukulele: moran,
    'acoustic guitar': ac2,
    telecaster: tele,
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={styles.Guitars}>
        {guitarData
          ? guitarData.map((guitar) => (
              <Item
                key={uniqid()}
                item={guitar.title}
                img={images[guitar.title.toLowerCase()]}
                price={guitar.price + '0€'}
                click={() => console.log('This guitar is', guitar.title)}
              />
            ))
          : null}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant='dark'
          text='CHECKOUT'
          click={() => console.log('entering checkout page')}
        />
      </div>
    </div>
  );
};

export default Guitars;
