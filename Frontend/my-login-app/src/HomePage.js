import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'; // Import your CSS file

function HomePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        const userDetailsResponse = await fetch('http://localhost:3003/user-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        });
        if (userDetailsResponse.ok) {
          const { program, year } = await userDetailsResponse.json();
          const userCoursesResponse = await fetch('http://localhost:3003/user-courses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail, program }), // Pass program here
          });
          if (userCoursesResponse.ok) {
            const userCourses = await userCoursesResponse.json();
            setCourses(userCourses);
          } else {
            console.error('Failed to fetch user courses');
          }
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user courses:', error);
      }
    };
    fetchUserCourses();
  }, []);

  return (
    <div className="home-page">
      <aside className="sidebar">
        <h2>Your Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <Link to={`/course/${course.id}`}>
                <button className="course-button">{course.course_name}</button>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default HomePage;
