import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './css.css';

function LoginPage() {
  const navigate = useNavigate(); // Initialize useNavigate here
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Reset previous errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    // If all validations pass, proceed with login
    try {
      const response = await fetch('http://localhost:3003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Login successful
        console.log('Login successful');
        navigate('/home');
      } else {
        // Login failed
        console.error('Login failed:', data.message);
        // You can display an error message to the user if needed
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle network errors or other exceptions
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-name">Welcome to StudySync!</h1>
        <h4></h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </header>
    </div>
  );
}

export default LoginPage;
