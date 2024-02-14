// App.js
import React from 'react';
import './css.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage'; // Import the Home page component

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} /> {/* Add the Home page route */}
          {/* Optionally, redirect "/" to "/login" or "/home" */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
