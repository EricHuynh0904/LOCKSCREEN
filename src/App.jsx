
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodosPage from './pages/todos';

function App() {
  return (
    <div className="App">
       
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
       
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/todos" element={<TodosPage />} />
      </Routes>
        
   
    </div>
      
    
  );
}

export default App;
