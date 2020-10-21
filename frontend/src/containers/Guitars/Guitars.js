import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { addItem } from '../../store/actions/cartActions';
import { removeAlert, setAlert } from '../../store/actions/alertActions';

const Guitars = () => {
  const history = useHistory();

  const images = {
    'les paul': lp,
    ukulele: moran,
    'acoustic guitar': ac2,
    telecaster: tele,
  };

  const guitarData = useSelector(({ guitars }) => guitars);
  const dispatch = useDispatch();

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
              click={() => {
                dispatch(
                  addItem({
                    id: guitar.id,
                    title: guitar.title,
                    price: guitar.price.toFixed(2),
                  })
                );
                dispatch(
                  setAlert({
                    type: 'success',
                    message: `${guitar.title} was added to cart!`,
                  })
                );
                setTimeout(() => {
                  dispatch(removeAlert());
                }, 5000);
              }}
            />
          ))
        ) : (
          <Spinner />
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant='dark'
          text='GO TO CART'
          click={() => history.push('/cart')}
        />
      </div>
    </div>
  );
};

export default Guitars;
