import React, { useState } from 'react';
import './css.css';
function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [ucid, setUcid] = useState('');
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courses, setCourses] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if(password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Sign Up details:', { email, password, name, ucid, program, year, semester, courses });
    // Here, you would usually send the data to your backend server for processing
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              UCID Number:
              <input
                type="text"
                value={ucid}
                onChange={(e) => setUcid(e.target.value)}
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
              <input
                type="text"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Year:
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Semester:
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Courses:
              <input
                type="text"
                value={courses}
                onChange={(e) => setCourses(e.target.value)}
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
