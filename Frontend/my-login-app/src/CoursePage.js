import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './css.css';

function CoursePage() {
  let { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Fetch course details based on the ID
    fetchCourseDetails(id);
  }, [id]);

  const fetchCourseDetails = async (id) => {
    try {
      // Make an API call to fetch course details based on the ID
      const response = await fetch(`/api/courses/${id}`);
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  return (
    <div>
      <div className="title">
        <h1>{course ? course.name : 'Loading...'}</h1>
      </div>
      <div className="content">
        {course ? (
          <div>
            <h2>Course ID: {id}</h2>
            <h3>Course Name: {course.name}</h3>
            <p>Description: {course.description}</p>
            {/* Render other course details */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default CoursePage;
