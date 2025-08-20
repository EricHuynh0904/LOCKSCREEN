
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import { Routes, Route } from 'react-router-dom';


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
    
      <Routes>
       
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
      
    
  );
}

export default App;
