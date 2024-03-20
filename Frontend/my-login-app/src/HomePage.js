// HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'; 
import CoursePosts from './CoursePosts'; 
import CreatePostForm from './CreatePostForm'; 

function HomePage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const [coursePosts, setCoursePosts] = useState([]);
  const [userId, setUserId] = useState(null); // State to store user ID
  const [program, setProgram] = useState(null); // State to store program

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
          setLoggedInUser(userEmail);
          const userDetailsResponse = await fetch('http://localhost:3003/user-details', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail }),
          });
          if (userDetailsResponse.ok) {
            const userDetails = await userDetailsResponse.json();
            setUserId(userDetails.userId); // Set the user ID
            setProgram(userDetails.program); // Set the program
            // Now fetch the user courses
            const userCoursesResponse = await fetch('http://localhost:3003/user-courses', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: userEmail, program: userDetails.program }),
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
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleCourseClick = async (courseId) => {
    setSelectedCourse(courseId);
    try {
      const response = await fetch(`http://localhost:3003/posts/${courseId}`);
      if (response.ok) {
        const posts = await response.json();
        setCoursePosts(posts);
      } else {
        console.error('Failed to fetch posts for the selected course');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="home-page">
      <aside className="sidebar">
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
      </aside>
      {loggedInUser && (
          <Link to="/CreatePostForm">
            <button className="add-post-button">+</button>
          </Link>
        )
      }
      <section className="course-content">
        {selectedCourse && <CoursePosts courseId={selectedCourse} posts={coursePosts} />}
        {selectedCourse && <CreatePostForm courseId={selectedCourse} userId={userId} program={program} />}
      </section>
    </div>
  );
}

export default HomePage;
