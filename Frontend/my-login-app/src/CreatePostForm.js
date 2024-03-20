import React, { useState } from 'react';

function CreatePostForm({ courseId, userId, program }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Fetch API endpoint to create a new post
    try {
      const response = await fetch('http://localhost:3003/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, title, content, courseId, program }),
      });
  
      if (response.ok) {
        // Post created successfully
        console.log('Post created successfully');
        // Reset form fields
        setTitle('');
        setContent('');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePostForm;
