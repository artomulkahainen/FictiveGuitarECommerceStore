import React from 'react';
import NavBar from './components/Navigation/NavBar';
import Routes from './routes/Routes';
import guitarService from './services/guitarService';
import { useState, useEffect } from 'react';

const App = () => {
  const [user, setUser] = useState(null);
  const [guitarData, setGuitarData] = useState(null);

  // USE EFFECTS
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    guitarService.getAll().then((guitars) => setGuitarData(guitars));
  });

  return (
    <div className='container'>
      <NavBar />
      <Routes user={user} setUser={setUser} guitarData={guitarData} />
    </div>
  );
};

export default App;
