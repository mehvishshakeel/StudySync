// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

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
        localStorage.setItem('userEmail', email);
        alert("Succesfully Logged In!")
        navigate('/home');
      } else {
        console.error('Login failed:', data.message);
        alert("Login Failed!/nEnsure that your Email/Password is Correct")
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-name">Welcome to StudySync!</h1>
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
