import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './background.module.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <div className={styles.background}>
          <App />
        </div>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
