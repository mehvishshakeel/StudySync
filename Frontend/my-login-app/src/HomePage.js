// HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css.css';
function HomePage() {
  // Example trending searches and courses data
  const [trendingSearches, setTrendingSearches] = useState(['ENSF 400', 'SENG 401', 'ENSF 444','SENG 438']);
  const [courses, setCourses] = useState([
    { id: 1, name: 'ENSF 400' },
    { id: 2, name: 'SENG 401' },
    { id: 3, name: 'ENSF 444' },
    { id: 4, name: 'SENG 438' },
  ]);

  return (
    <div className="home-page">
      <aside className="sidebar">
        <h2>Your Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <Link to={`/course/${course.id}`}>{course.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="trending">
        <h2>Trending</h2>
        <ul>
          {trendingSearches.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default HomePage;
