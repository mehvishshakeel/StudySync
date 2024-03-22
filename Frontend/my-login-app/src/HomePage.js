

// import React, { useState, useEffect } from 'react';
// import './homepage.css'; 
// import CoursePosts from './CoursePosts'; 
// import CreatePostForm from './CreatePostForm'; 
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// function HomePage() {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [loggedInUser, setLoggedInUser] = useState(null); 
//   const [coursePosts, setCoursePosts] = useState([]);
//   const [userId, setUserId] = useState(null); // State to store user ID
//   const [program, setProgram] = useState(null); // State to store program
//   const [showCreatePostForm, setShowCreatePostForm] = useState(false); // State to control visibility of create post form
//   const [selectedCourseId, setSelectedCourseId] = useState(null);

//   const mentalHealthTips = [
//     { id: 1, tip: "Take time for yourself every day, even if it's just a few minutes." },
//     { id: 2, tip: "Stay connected with friends and family to share your feelings and experiences." },
//     { id: 3, tip: "Maintain a regular sleep schedule to improve your mood and energy levels." },
//     { id: 4, tip: "Exercise regularly to reduce stress, anxiety, and symptoms of depression." },
//     { id: 5, tip: "Practice mindfulness or meditation to help clear your mind and reduce stress." },
//   ];
  
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const userEmail = localStorage.getItem('userEmail');
//         if (userEmail) {
//           setLoggedInUser(userEmail);
//           const userDetailsResponse = await fetch('http://localhost:3003/user-details', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email: userEmail }),
//           });
//           if (userDetailsResponse.ok) {
//             const userDetails = await userDetailsResponse.json();
//             setUserId(userDetails.userId); // Set the user ID
//             setProgram(userDetails.program); // Set the program
//             // Now fetch the user courses
//             const userCoursesResponse = await fetch('http://localhost:3003/user-courses', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ email: userEmail, program: userDetails.program }),
//             });
//             if (userCoursesResponse.ok) {
//               const userCourses = await userCoursesResponse.json();
//               setCourses(userCourses);
//             } else {
//               console.error('Failed to fetch user courses');
//             }
//           } else {
//             console.error('Failed to fetch user details');
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };
//     fetchUserDetails();
//   }, []);

//   const handleCourseClick = async (courseId) => {
//     setSelectedCourse(courseId);
//     setSelectedCourseId(courseId);
//     try {
//       const response = await fetch(`http://localhost:3003/posts/${courseId}`);
//       if (response.ok) {
//         const posts = await response.json();
//         setCoursePosts(posts);
//         setShowCreatePostForm(false); // Hide create post form when a course is selected
//       } else {
//         console.error('Failed to fetch posts for the selected course');
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };

//   const handleCourseChange = (courseId) => {
//     setSelectedCourseId(courseId);
//   };

//   // Function to handle creating a new post
//   const handleCreatePost = async (newPostData) => {
//     try {
//       const response = await fetch('http://localhost:3003/create-post', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newPostData),
//       });

//       if (response.ok) {
//         // Post created successfully
//         console.log('Post created successfully');
//         // Fetch the latest posts for the selected course
//         const response = await fetch(`http://localhost:3003/posts/${selectedCourse}`);
//         if (response.ok) {
//           const posts = await response.json();
//           // setCoursePosts(posts);
//           // Update the state to include the new post
//           setCoursePosts([...coursePosts, posts])
//           // Reset selected course to trigger re-rendering of CoursePosts component
//           setSelectedCourse(null);
//           setSelectedCourse(selectedCourse); // This will trigger re-rendering of CoursePosts component
//         } else {
//           console.error('Failed to fetch posts for the selected course');
//         }
//       } else {
//         console.error('Failed to create post');
//       }
//     } catch (error) {
//       console.error('Error creating post:', error);
//     }
//   };

//   // Function to handle deleting a post
//   const handlePostDeletion = async (deletedPostId) => {
//     try {
//       // Make API call to delete post
//       const response = await fetch(`http://localhost:3003/delete-post/${userId}/${deletedPostId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         // If deletion is successful, update the state to reflect the deleted post
//         setCoursePosts(coursePosts.filter(post => post.postId !== deletedPostId));
//       } else {
//         console.error('Failed to delete post');
//       }
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   // Function to toggle the visibility of the create post form
//   const toggleCreatePostForm = () => {
//     setShowCreatePostForm(!showCreatePostForm);
//   };

//   return (
//     <div className="home-page">
//       <section className="carousel-section">
//              <section className="carousel-section">
//      <Carousel showArrows={false} infiniteLoop={true} autoPlay={true} interval={3000} showThumbs={false} showIndicators={false} showStatus={false}>
//           {mentalHealthTips.map((tip, index) => (
//             <div key={index}>
//               <h2>Mental Health Tip</h2>
//               <p>{tip.tip}</p>             
//               </div>
//            ))}         
//            </Carousel>
//        </section>
//       </section>
//       <aside className="sidebar">
//         <h1 className='brand-name'>STUDYSYNC</h1>
//         <h2>Your Courses</h2>
//         <ul>
//           {courses.map((course) => (
//             <li key={course.id}>
//               <button className="course-button" onClick={() => handleCourseClick(course.id)}>
//                 {course.course_name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </aside>
//       <div className="create-post-toggle" onClick={toggleCreatePostForm}>
//         <i className="fasfaplus">+</i> {/* You can replace with an image or svg */}
//       </div>
//       {showCreatePostForm && (
//         <section className="course-content">
//           <CreatePostForm courseId={selectedCourse} userId={userId} program={program} onPostCreated={handleCreatePost} />
//         </section>
//       )}

//       {selectedCourse && !showCreatePostForm && (
//         <section className="course-content">
//           <CoursePosts
//             courseId={selectedCourse}
//             posts={coursePosts}
//             userId={userId}
//             onDelete={handlePostDeletion}
//             onEdit={handleCourseClick} // Pass handleCourseClick as a prop
//             onCourseChange={handleCourseChange}
//           />
//           {/* <button onClick={toggleCreatePostForm}>Create New Post</button> */}
//         </section>
//       )}
//     </div>
//   );
// }

// export default HomePage;


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

  const mentalHealthTips = [
    { id: 1, tip: "Take time for yourself every day, even if it's just a few minutes." },
    { id: 2, tip: "Stay connected with friends and family to share your feelings and experiences." },
    { id: 3, tip: "Maintain a regular sleep schedule to improve your mood and energy levels." },
    { id: 4, tip: "Exercise regularly to reduce stress, anxiety, and symptoms of depression." },
    { id: 5, tip: "Practice mindfulness or meditation to help clear your mind and reduce stress." },
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
        console.log('here')
        if (response.ok) 
        {
          console.error('Failed to fetch posts for the selected course');
        }
      } else {
        // Post deleted successfully, fetch the updated posts for the selected course
        const response = await fetch(`http://localhost:3003/posts/${selectedCourse}`);
        const posts = await response.json();
        setCoursePosts(posts);
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

  return (
    <div className="home-page">
      <section className="carousel-section">
        <Carousel showArrows={false} infiniteLoop autoPlay interval={3000} showThumbs={false} showIndicators={false} showStatus={false}>
          {mentalHealthTips.map((tip, index) => (
            <div key={index}>
              <h2>Mental Health Tip</h2>
              <p>{tip.tip}</p>             
            </div>
          ))}         
        </Carousel>
      </section>
      <aside className="sidebar">
        <h1 className='brand-name'>STUDYSYNC</h1>
        <h2>Your Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <button className="course-button" onClick={() => handleCourseClick(course.id)}>
                {course.course_name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="create-post-toggle" onClick={toggleCreatePostForm}>
        <i className="fasfa-plus">+</i> 
      </div>
      {showCreatePostForm && (
        <section className="course-content">
          <CreatePostForm courseId={selectedCourse} userId={userId} program={program} onPostCreated={handleCreatePost} />
        </section>
      )}

      {selectedCourse && !showCreatePostForm && (
        <section className="course-content">
          <CoursePosts
            courseId={selectedCourse}
            posts={coursePosts}
            userId={userId}
            onDelete={handlePostDeletion}
            onEdit={handlePostEdit}
            onCourseChange={handleCourseChange}
          />
        </section>
      )}
    </div>
  );
}

export default HomePage;
