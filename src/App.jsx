import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Videos from './components/video/Videos';
import Register from './components/auth/Register'; 
import Login from './components/auth/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Videos />} /> 
      </Routes>
    </Router>
  );
}

export default App;
