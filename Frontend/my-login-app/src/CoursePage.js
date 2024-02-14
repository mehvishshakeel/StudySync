// CoursePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './css.css';

function CoursePage() {
  let { id } = useParams();

  return (
    <div>
      <h2>Course ID: {id}</h2>
      {/* Display course details based on ID */}
    </div>
  );
}

export default CoursePage;
