import React from 'react';
import NavBar from './components/Navigation/NavBar';
import Routes from './Routes/Routes';

import { useState } from 'react';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className='container'>
      <NavBar />
      <Routes user={user} setUser={setUser} />
    </div>
  );
};

export default App;
