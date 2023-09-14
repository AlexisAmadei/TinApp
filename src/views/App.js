import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './css/App.css';
import Landing from './Landing';
import Terrier from './Terrier';
import SecurityLayout from '../Layout/SecurityLayout';

function App() {
  return (
    <div className='app-wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/' element={<SecurityLayout />}>
            <Route path='terrier' element={<Terrier />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
