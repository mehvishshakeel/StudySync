import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './css.css';

function LoginPage() {
  const navigate = useNavigate(); // Initialize useNavigate here
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event) => {
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
    console.log('Login details:', { email, password });
    navigate('/home');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Login</h2>
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
