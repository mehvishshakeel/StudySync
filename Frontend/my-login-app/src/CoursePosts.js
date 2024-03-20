import React from 'react';
import './CoursePosts.css'; // Import CSS file for styling

function CoursePosts({ courseName, posts }) {
  return (
    <div className="course-posts">
      <h3 className="course-header">Posts for Course: {courseName}</h3>
      <div className="post-container">
        {posts.map((post, index) => (
          <div className="post-tile" key={index}>
            <h4 className="post-title">{post.title}</h4>
            <p className="post-content">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursePosts;
