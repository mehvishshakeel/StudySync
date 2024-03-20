import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './homepage.css';

function HomePage() {
  const courses = [
    { id: 1, name: 'ENSF 400' },
    { id: 2, name: 'SENG 401' },
    { id: 3, name: 'ENSF 444' },
    { id: 4, name: 'SENG 438' },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const posts = [
    { id: 1, title: 'Post 1', body: 'This is the body of post 1.', timestamp: '2024-03-20', author: 'Author A' },
    { id: 2, title: 'Post 2', body: 'This is the body of post 2.', timestamp: '2024-03-21', author: 'Author B' },
    { id: 3, title: 'Post 3', body: 'This is the body of post 3.', timestamp: '2024-03-22', author: 'Author C' },
    { id: 4, title: 'Post 4', body: 'This is the body of post 4.', timestamp: '2024-03-23', author: 'Author D' },
  ];

  const mentalHealthTips = [
    { id: 1, tip: "Take time for yourself every day, even if it's just a few minutes." },
    { id: 2, tip: "Stay connected with friends and family to share your feelings and experiences." },
    { id: 3, tip: "Maintain a regular sleep schedule to improve your mood and energy levels." },
    { id: 4, tip: "Exercise regularly to reduce stress, anxiety, and symptoms of depression." },
    { id: 5, tip: "Practice mindfulness or meditation to help clear your mind and reduce stress." },
  ];

  return (
    <div className="home-page">
      <section className="carousel-section">
        <Carousel showArrows={false} infiniteLoop={true} autoPlay={true} interval={3000} showThumbs={false} showIndicators={false} showStatus={false}>
          {mentalHealthTips.map((tip, index) => (
            <div key={index}>
              <h2>Mental Health Tip</h2>
              <p>{tip.tip}</p>
            </div>
          ))}
        </Carousel>
      </section>
      
      <section className="cards-section">
        {posts.map((post) => (
          <div className="card" key={post.id}>
            <div className="card-actions">
              <span className="edit-action">•<span className="tooltip">Edit</span></span>
              <span className="delete-action">•<span className="tooltip">Delete</span></span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>Posted by {post.author} on {post.timestamp}</small>
          </div>
        ))}
      </section>
      
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2>Your Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <Link to={`/course/${course.id}`}>{course.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default HomePage;
