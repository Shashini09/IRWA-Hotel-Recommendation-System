import React, { useState, useEffect } from 'react';
import '../styels/styles.css'; // Import the CSS file
import PopularHotels from './PopularHotels';
import Header from './header';
import HotelSearch from './requirementsearch';
import { Link } from 'react-router-dom';

const DynamicBackground = () => {
  // Array of hotel image URLs
  const hotelImages = [
    'https://images.unsplash.com/photo-1454388683759-ee76c15fee26?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1663659510931-dfccbb2df4f6?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  // State to store the current background image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hotelImages.length);
    }, 5000); // Change every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [hotelImages.length]);

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${hotelImages[currentImageIndex]})`,
      }}
    >
       <nav> 
          <ul>
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/Register">Register</Link></li>
            
          </ul>
        </nav>
    
      

      <h1 style={{ color: '#404141', textAlign: 'center', paddingTop: '10%' }}>
        Welcome to the Hotel Recommendation System
      </h1>
      <HotelSearch/>

      <PopularHotels/>
    </div>
  );
};

export default DynamicBackground;
