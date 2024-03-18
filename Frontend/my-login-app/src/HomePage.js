import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel'; // Import carousel component
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import './homepage.css';

function HomePage() {
  // Example trending searches and courses data
  const trendingSearches = ['ENSF 400', 'SENG 401', 'ENSF 444', 'SENG 438'];
  const courses = [
    { id: 1, name: 'ENSF 400' },
    { id: 2, name: 'SENG 401' },
    { id: 3, name: 'ENSF 444' },
    { id: 4, name: 'SENG 438' },
  ];

  // State variable to track sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="home-page">
      <section className="carousel-section">
        <Carousel showArrows={false} infiniteLoop={true} autoPlay={true} interval={3000} showThumbs={false} showIndicators={false} showStatus={false}>
          {trendingSearches.map((search, index) => (
            <div key={index}>
              <h2>Trending Course: {search}</h2>
              {/* Add any additional course details or actions */}
            </div>
          ))}
        </Carousel>
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
