// HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'; // Import your CSS file
import CoursePosts from './CoursePosts'; // Import the CoursePosts component

function HomePage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); // Define loggedInUser state

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

  const handleCourseClick = (courseId) => {
    setSelectedCourse(courseId);
  };

  return (
    <div className="home-page">
      <aside className="sidebar">
        {/* Home Button */}
        <Link to="/home">
          <button className="home-button">Home</button>
        </Link>
        <h2>Your Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <button className="course-button" onClick={() => handleCourseClick(course.id)}>
                {course.course_name}
              </button>
            </li>
          ))}
        </ul>
        {/* Plus Button to Add New Posts */}
        {loggedInUser && (
          <Link to="/add-post">
            <button className="add-post-button">+</button>
          </Link>
        )}
      </aside>
      <section className="course-content">
        {selectedCourse && <CoursePosts courseId={selectedCourse} />}
      </section>
    </div>
  );
}

export default HomePage;