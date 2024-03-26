import React, { useState, useEffect } from 'react';
import './CoursePosts.css';

function CoursePosts({ courseId, posts, userId, onDelete, onEdit, onCourseChange }) {
  const [editMode, setEditMode] = useState(null); // State to track edit mode for each post
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null); // Define selectedCourse here
  const [coursePosts, setCoursePosts] = useState([]);



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
    // Confirm deletion with the user
    const confirmDeletion = window.confirm("Are you sure you want to delete this post? This action is irreversible.");
  
    if (confirmDeletion) {
      try {
        const response = await fetch(`http://localhost:3003/delete-post/${userId}/${postId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // Display confirmation message
          alert('Post deleted successfully');
          
          // Store the selected course ID in local storage
          localStorage.setItem('selectedCourseId', courseId);
  
          // // Reload the page
          onDelete(postId);
          onCourseChange(courseId);

        } else {
          console.error('Failed to delete post');
          alert('OOPS ! That is NOT your POST');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };


  const onPostDeleted = (deletedPostId) => {
    // Trigger the parent component to refresh posts after deletion
    onDelete(deletedPostId);
  };


  const handleEdit = (postId) => {
    console.log("Editing post with ID:", postId);
    setEditMode(postId);
  };

  const handleCancelEdit = () => {
    // Cancel editing and reset the edit mode
    setEditMode(null);
    setEditedTitle('');
    setEditedContent('');
  };


  
  const handleSaveEdit = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3003/edit-post/${userId}/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editedTitle, content: editedContent }),
      });
      if (response.ok) {
        alert('Post edited successfully');
        onEdit(postId);
        setEditMode(null);
        setEditedTitle('');
        setEditedContent('');
        // Fetch updated posts for the selected course
        const postsResponse = await fetch(`http://localhost:3003/posts/${selectedCourse}`);
        if (postsResponse.ok) {
          const updatedPosts = await postsResponse.json();
          setCoursePosts(updatedPosts);
        } else {
          console.error('Failed to fetch updated posts');
        }
      } else {
        console.error('Failed to edit post');
        alert('Seems like you are Trying to Edit a post that does not Belong to You. \nMaybe you Misclicked?');
      }
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };
  
  return (
    <div className="course-posts">
      <div className='cards-container'>
        <div className="cards-section">
          {sortedPosts.map((post) => (
            <div key={post.postId} className="card">
              <div className="card-actions">
                {editMode === post.PostID ? (
                  <>
                    {/* <button onClick={() => handleSaveEdit(post.PostID)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button> */}
                  </>
                ) : (
                  <>
                    <span className="delete-action" onClick={() => handleDelete(post.PostID)}>
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </span>
                    <span className="edit-action" onClick={() => handleEdit(post.PostID)}>
                      <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </span>
                  </>
                )}
              </div>
              {editMode === post.PostID ? (
                <div className={`edit-form ${editMode === post.PostID ? 'visible' : 'hidden'}`}>
                <label htmlFor="editedTitle" className='title-text'>Title:</label>
                <input
                  type="text"
                  id="editedTitle"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <label htmlFor="editedContent" className='content-text'>Content:</label>
                <textarea
                  id="editedContent"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <div className="edit-form-buttons">
                  <button className ='save-button' onClick={() => handleSaveEdit(post.PostID)}>Save</button>
                  <button className='cancel-button' onClick={handleCancelEdit}>Cancel</button>
                </div>
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
    </div>
  );
  
}

export default CoursePosts;


