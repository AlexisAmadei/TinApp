import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../.config/firebaseConfig";

import Landing from './Landing';
import Terrier from './Terrier';
import Loading from '../components/Loading'
import SecurityLayout from '../Layout/SecurityLayout';
import ConnectedLayout from '../Layout/ConnectedLayout';
import WhiteRabbit from './WhiteRabbit';
import NotFoundPage from './404';
import './css/App.css';


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
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
