import React from 'react';
import './css.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Import the home icon from react-icons
import HomePage from './HomePage'; // Import the Home page component
import LoginPage from './LoginPage'; // Import the Login page component
import SignUpPage from './SignUpPage'; // Import the Sign Up page component

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ position: 'fixed', top: 0, left: 0 }}>
          {/* Use the home icon for the link */}
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <Link 
                to="/home" 
                style={{ 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '15px 18px',
                  backgroundColor: '#8CC084', 
                  color: '#666', 
                  borderRadius: '5px', 
                  fontWeight: 'bold',
                  animation: 'buttonClickAnimation 0.5s', // Adjusted animation duration
                  marginLeft: '10px', // Added left margin to move the button slightly to the right
                }}
              >
                <FaHome style={{ marginRight: '5px' }} />
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* Route for Home page */}
          <Route path="/home" element={<HomePage />} />
          {/* Optionally, redirect "/" to "/home" */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
