// import React from 'react';
// import './css.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './HomePage';
// import LoginPage from './LoginPage';
// import SignUpPage from './SignUpPage';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <nav style={{ position: 'fixed', top: 0, left: 0 }}>
//           {/* Removed the home button link */}
//         </nav>

//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/home" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from 'react';
import './css.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        {/* <nav style={{ position: 'fixed', top: 0, left: 0 }}>
          <button onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </nav> */}

        <Routes>
          <Route path="/" element={<LoginPage darkMode={darkMode} />} />
          <Route path="/home" element={<HomePage darkMode={darkMode} />} />
          <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
          <Route path="/signup" element={<SignUpPage darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
