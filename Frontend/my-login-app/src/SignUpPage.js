import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './css.css';

function SignUpPage() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
  
  const programs = [
    'Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Software Engineering',
    'Chemical Engineering',
    'Energy Engineering',
    'Biomedical Engineering',
    'Geomatics Engineering',
    'Sustainable Systems Engineering',
    'Engineering Physics'
  ];
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if(email === null){
      alert("Please fill in your EMail!");
      return;
    }
    if(year>4 || year<1){
      alert("Please fill in the Year that you are currently enrolled in!");
      return;
    }
    

    const userData = {
      fname,
      lname,
      email,
      program,
      password,
      year
    };

    try {
      const response = await fetch('http://localhost:3003/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }
      
      const data = await response.json();
      console.log(data);
      alert("Account Successfully Created!")
      navigate('/login'); // Use navigate function to navigate to '/login'
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              First Name:
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
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
          </div>
          <div>
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Program:
              <select value={program} onChange={(e) => setProgram(e.target.value)}>
                <option value="">Select Program</option>
                {programs.map((prog) => (
                  <option key={prog} value={prog}>{prog}</option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Year:
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </header>
    </div>
  );
}

export default SignUpPage;