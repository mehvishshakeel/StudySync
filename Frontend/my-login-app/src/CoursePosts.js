// CoursePosts.js
import React, { useState, useEffect } from 'react';

function CoursePosts({ courseId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3003/posts?courseId=${courseId}`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [courseId]);

  return (
    <div className="course-posts">
      <h2>Posts for Course {courseId}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.PostID}>
            <h3>{post.Title}</h3>
            <p>{post.Content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoursePosts;
