import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import RecipiePage from './RecipiePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/Reccypi' element= {<HomePage />}></Route>
      <Route path='/Reccypi/recipie/:id' element= {<RecipiePage />}></Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>
);
