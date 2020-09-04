import React from 'react';
import { useDispatch } from 'react-redux';
import NavBar from './components/Navigation/NavBar';
import Routes from './routes/Routes';
import { useEffect } from 'react';
import { initGuitars } from './store/reducers/guitarReducer';
import { checkUser } from './store/reducers/userLoggedReducer';

const App = () => {
  const dispatch = useDispatch();

  // CHECK IF USER ALREADY LOGGED IN
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    /*console.log('current loggerUserJSON: ');
    console.log(loggedUserJSON);*/
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(checkUser(user));
    }
  }, [dispatch]);

  // GET GUITARS DATA FROM BACKEND
  useEffect(() => {
    dispatch(initGuitars());
  }, [dispatch]);

  return (
    <div className='container'>
      <NavBar />
      <Routes />
    </div>
  );
};

export default App;
