import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './css/App.css';
import Landing from './Landing';
import Terrier from './Terrier';
import Loading from '../components/Loading'

import SecurityLayout from '../Layout/SecurityLayout';
import ConnectedLayout from '../Layout/ConnectedLayout';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../.config/firebaseConfig";
import WhiteRabbit from './WhiteRabbit';

function App() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => setUser(user || false));

  if (user === null) return <Loading />;
  return (
    <div className='app-wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/security' element={<SecurityLayout user={user} />}>
            <Route path='login' element={<Terrier />} />
          </Route>
          <Route path='/' element={<ConnectedLayout user={user} />}>
            <Route path='white-rabbit' element={<WhiteRabbit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
