import React, { useState, useEffect } from 'react';
import './CoursePosts.css';

function CoursePosts({ courseId, posts, userId, onDelete, onEdit }) {
  const [editMode, setEditMode] = useState(null); // State to track edit mode for each post
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  // Check if a course is selected
  if (!courseId) {
    return <div className="course-pick-prompt"><p>Please select a course</p></div>;
  }

  // Check if there are no posts for the selected course
  if (courseId && posts.length === 0) {
    return (
      <div className="course-no-posts">
        <p className='no-post-text'>
          Hmmm ! 🤔<br/>
          Seems like No One has made a Post for this Course Yet <br/>
          Why not be the First ? 
        </p>
      </div>
    );
  }

  // Sort posts by date, assuming each post has a 'createdAt' field indicating the creation date
  const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3003/delete-post/${userId}/${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Display confirmation message
        alert('Post deleted successfully');
        alert('Select the course again to ensure changes are set!');
        // Trigger the parent component to refresh posts after deletion
        onPostDeleted(postId);
      } else {
        console.error('Failed to delete post');
        console.log('Actually it didnt - delete works!')
        alert('OOPS ! That is NOT your POST');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const onPostDeleted = (deletedPostId) => {
    // Trigger the parent component to refresh posts after deletion
    onDelete(deletedPostId);
  };


  const handleEdit = async (postId) => {
    // Toggle edit mode for the clicked post
    setEditMode(postId);
    
    // Retrieve the current post details and pre-fill the edit form
    const postToEdit = posts.find(post => post.postId === postId);
    setEditedTitle(postToEdit.Title);
    setEditedContent(postToEdit.Content);

    // Call the onEdit function
    onEdit(postId);
  }

  const handleCancelEdit = () => {
    // Cancel editing and reset the edit mode
    setEditMode(null);
    setEditedTitle('');
    setEditedContent('');
  };

  const handleSaveEdit = async (postId) => {
    try {
      // Perform the edit operation using API call
      const response = await fetch(`http://localhost:3003/edit-post/${userId}/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editedTitle, content: editedContent }),
      });

      if (response.ok) {
        // Post edited successfully
        alert('Post edited successfully');
        // Refresh the posts after editing
        onEdit(postId);
        // Reset edit mode
        setEditMode(null);
        setEditedTitle('');
        setEditedContent('');
      } else {
        console.error('Failed to edit post');
      }
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  return (
    <div className="course-posts">
      <div className="cards-section">
        {sortedPosts.map((post) => (
          <div key={post.postId} className="card">
            <div className="card-actions">
              {editMode === post.postId ? (
                <>
                  <button onClick={() => handleSaveEdit(post.postId)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <span className="delete-action" onClick={() => handleDelete(post.PostID)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </span>
                  <span className="edit-action" onClick={() => handleEdit(post.postId)}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </span>
                </>
              )}
            </div>
            {editMode === post.postId ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              </div>
            ) : (
              <>
                <h4>{post.Title}</h4>
                <p>{post.Content}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursePosts;
