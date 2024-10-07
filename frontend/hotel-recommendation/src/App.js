import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />

      </Routes>
    </Router>
  );
}

export default App;
