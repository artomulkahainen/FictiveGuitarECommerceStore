import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import lp from '../../assets/img/lespaul.jpg';
import moran from '../../assets/img/moran.jpg';
import ac2 from '../../assets/img/acousticguitar.jpg';
import tele from '../../assets/img/tele.jpg';
import styles from './Guitars.module.css';
import Item from '../../components/Item/Item';
import Button from '../../components/Button/Button';
import uniqid from 'uniqid';
import Spinner from '../../components/SpinnerItem/SpinnerItem';

const Guitars = () => {
  const history = useHistory();

  const images = {
    'les paul': lp,
    ukulele: moran,
    'acoustic guitar': ac2,
    telecaster: tele,
  };

  const guitarData = useSelector(({ guitars }) => guitars);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={styles.Guitars}>
        {guitarData ? (
          guitarData.map((guitar) => (
            <Item
              key={uniqid()}
              item={guitar.title}
              img={images[guitar.title.toLowerCase()]}
              price={guitar.price.toFixed(2) + '€'}
              click={() => console.log('This guitar is', guitar.title)}
            />
          ))
        ) : (
          <Spinner />
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant='dark'
          text='CHECKOUT'
          click={() => history.push('/checkout')}
        />
      </div>
    </div>
  );
};

export default Guitars;
