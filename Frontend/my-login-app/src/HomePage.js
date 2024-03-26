

import React, { useState, useEffect } from 'react';
import './homepage.css'; 
import CoursePosts from './CoursePosts'; 
import CreatePostForm from './CreatePostForm'; 
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function HomePage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const [coursePosts, setCoursePosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [program, setProgram] = useState(null);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const [currentSlide, setCurrentSlide] = useState(0); // State for current carousel slide

  const mentalHealthTips = [
    { id: 1, tip: "Practice deep breathing exercises to reduce stress and promote relaxation." },
    { id: 2, tip: "Limit your consumption of caffeine and alcohol, as they can worsen anxiety and disrupt sleep patterns." },
    { id: 3, tip: "Set realistic goals for yourself and celebrate your achievements, no matter how small." },
    { id: 4, tip: "Engage in hobbies or activities that you enjoy to boost your mood and overall well-being." },
    { id: 5, tip: "Seek professional help if you're struggling with your mental health. Therapy and counseling can provide valuable support and coping strategies." },
    { id: 6, tip: "Stay hydrated throughout the day to maintain optimal brain function and physical health." },
    { id: 7, tip: "Limit screen time, especially before bedtime, to improve sleep quality and reduce feelings of restlessness." },
    { id: 8, tip: "Practice gratitude by reflecting on the positive aspects of your life and expressing appreciation for the people around you." },
    { id: 9, tip: "Establish a routine that includes regular exercise, healthy meals, and sufficient sleep to promote overall wellness." },
    { id: 10, tip: "Connect with nature by spending time outdoors, which can reduce stress and increase feelings of calmness and happiness." },
  ];

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
            setUserId(userDetails.userId);
            setProgram(userDetails.program);
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
    try {
      setSelectedCourse(courseId);
      const response = await fetch(`http://localhost:3003/posts/${courseId}`);
      if (response.ok) {
        const posts = await response.json();
        setCoursePosts(posts);
        setShowCreatePostForm(false);
      } else {
        console.error('Failed to fetch posts for the selected course');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async (newPostData) => {
    try {
      const response = await fetch('http://localhost:3003/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPostData),
      });
      
      if (response.ok) {
        console.log('here');
        if (response.ok) {
          console.log('Failed to create post')
        } 
      }else {
          console.error('Now Showing Updated Posts');
          const response = await fetch(`http://localhost:3003/posts/${selectedCourse}`);
          const posts = await response.json();
          setCoursePosts(posts);
          setShowCreatePostForm(false);
        }
      } catch (error) {
      console.error('Error creating post:', error);
      }
    };
  

  const handlePostDeletion = async (deletedPostId) => {
    try {
      const response = await fetch(`http://localhost:3003/delete-post/${userId}/${deletedPostId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Post deleted successfully');
        const response = await fetch(`http://localhost:3003/posts/${selectedCourse}`);
        const posts = await response.json();
        setCoursePosts(posts);
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handlePostEdit = (postId) => {
    // Trigger refresh of posts after editing
    fetchCoursePosts(selectedCourse);
  };

  const handleCourseChange = (courseId) => {
    // Update the selected course posts
    fetchCoursePosts(courseId);
  };

  // Function to fetch course posts
  const fetchCoursePosts = async (courseId) => {
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

  const toggleCreatePostForm = () => {
    setShowCreatePostForm(!showCreatePostForm);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCarouselChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar section */}
      <aside className={`sidebar ${darkMode ? 'dark-mode' : ''}`}>
        <div className="sidebar-header">
          <h1 className='brand-name'>STUDYSYNC</h1>
          <div className="sidebar-buttons">
            <button className="Display" onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Night Mode"}
            </button>
            <button className="Post" onClick={toggleCreatePostForm}>
              <div classname="plus-add-post">
                {darkMode ? "+" : "+"}
              </div>
            </button>
          </div>
        </div>

        <h2>Courses</h2>
        <ul className='course-button-container'>
          {courses.map((course) => (
            <li key={course.id}>
              <button className="course-button" onClick={() => handleCourseClick(course.id)}>
                <div className='course-button-text'>
                {course.course_name}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content section */}
      <section className="main-content">
        {/* Carousel section */}
        <div className="carousel-section">
          <Carousel
            showArrows={false}
            infiniteLoop
            autoPlay
            interval={3575}
            showThumbs={false}
            showIndicators={true}
            showStatus={false}
            onChange={handleCarouselChange}
          >
            {mentalHealthTips.map((tip, index) => (
              <div key={index}>
                <h2>Mental Health Tip</h2>
                <p>{tip.tip}</p>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Create Post Form section */}
        {showCreatePostForm && (
          <div className="create-post-form-section">
            <CreatePostForm courseId={selectedCourse} userId={userId} program={program} onPostCreated={handleCreatePost} />
          </div>
        )}

        {/* Course Posts section */}
        {selectedCourse && !showCreatePostForm && (
          <div className="course-posts-section">
            <CoursePosts
              courseId={selectedCourse}
              posts={coursePosts}
              userId={userId}
              onDelete={handlePostDeletion}
              onEdit={handlePostEdit}
              onCourseChange={handleCourseChange}
            />
          </div>
        )}
      </section>
    </div>
  );
}
  

export default HomePage;

