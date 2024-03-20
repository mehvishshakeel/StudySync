import React from 'react';
import './css.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ position: 'fixed', top: 0, left: 0 }}>
          {/* Removed the home button link */}
        </nav>

        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
