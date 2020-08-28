import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './background.module.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className={styles.background}>
        <App />
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
