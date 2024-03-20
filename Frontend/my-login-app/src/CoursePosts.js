// CoursePosts.js
import React from 'react';

function CoursePosts({ courseId, posts, userId, onDelete, onEdit }) {
  return (
    <div className="course-posts">
      <h3>Posts for Course {courseId}</h3>
      <div className="post-container">
        {posts.map((post, index) => (
          <div key={index} className="post-tile">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            {userId === post.userId && (
              <div className="post-actions">
                <button onClick={() => onDelete(post.postId)}>Delete</button>
                <button onClick={() => onEdit(post.postId)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursePosts;
