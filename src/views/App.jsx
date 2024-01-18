import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../.config/firebaseConfig";

import Loading from '../components/Loading'

import Landing from './Landing';
import Terrier from './Terrier';
import WhiteRabbit from './WhiteRabbit';
import NotFoundPage from './404';
import SecurityLayout from '../Layout/SecurityLayout';
import ConnectedLayout from '../Layout/ConnectedLayout';
import AppLayout from '../Layout/AppLayout';

import './css/App.css';

import AppCR from '../apps/ClashRoyale';
import MyWorld from '../apps/MyWorld';
import ClashofClans from '../apps/ClashofClans';

function App() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => setUser(user || false));

  if (user === null) return <Loading />;
  return (
    <div className='app-wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/security' element={<SecurityLayout user={user}/>}>
            <Route path='login' element={<Terrier />} />
          </Route>
          <Route path='/' element={<ConnectedLayout user={user}/>}>
            <Route path='white-rabbit' element={<WhiteRabbit />}/>
          </Route>
          <Route path='/app' element={<AppLayout user={user} />}>
            <Route path='clash-royale' element={<AppCR />}/>
            <Route path='my-world' element={<MyWorld />} />
            <Route path='clash-of-clans' element={<ClashofClans />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
