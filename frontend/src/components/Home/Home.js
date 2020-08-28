import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.Home}>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>
        Welcome to Artzi's Guitar Store!
      </h1>
    </div>
  );
};

export default Home;
