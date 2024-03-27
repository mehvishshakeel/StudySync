

import React, { useState } from 'react';
import './CreatePostForm.css'; // Import the CSS file


function CreatePostForm({ courseId, userId, program, onPostCreated }) {
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
        // Show success message
        alert('Post created successfully');
        onPostCreated();
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className='title-div'>
        <label htmlFor="title"className='title-text' >Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className='content-div'>
        <label htmlFor="content" className='content-text'>Content:</label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePostForm;
