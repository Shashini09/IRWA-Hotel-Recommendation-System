import React, { useState } from 'react';
import axios from 'axios';
import { ref, get } from 'firebase/database';
import { database } from '../firebase';
import { Input, Button, Card, message } from 'antd'; // Import Ant Design components
import Header from '../components/header';
import Footer from '../components/footer';
import PopularHotels from '../components/PopularHotels';
import { Link } from 'react-router-dom';

function Login() {
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const checkUserInFirebase = async (userId) => {
    try {
      const userRef = ref(database, `users/${userId}`);
      const userSnapshot = await get(userRef);
      return userSnapshot.exists();
    } catch (error) {
      console.error('Error checking user in Firebase:', error);
      message.error('Error connecting to Firebase');
      return false;
    }
  };

  const handleLogin = async () => {
    const userExists = await checkUserInFirebase(userId);

    if (userExists) {
      setIsLoggedIn(true);
      setErrorMessage('');
      getRecommendations();
    } else {
      setIsLoggedIn(false);
      setErrorMessage('Login failed: Invalid User ID');
      message.error('Login failed: Invalid User ID'); // Show error message using Ant Design
    }
  };

  const getRecommendations = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/recommend', {
        user_id: userId
      });
      if (response.data.status === 'success') {
        setRecommendations(response.data.recommendations);
      } else {
        setErrorMessage('Error fetching recommendations');
        message.error('Error fetching recommendations'); // Show error message using Ant Design
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setErrorMessage('Error fetching recommendations');
      message.error('Error fetching recommendations'); // Show error message using Ant Design
    }
  };

  return (
    <div className="login-page" style={{ padding: '50px' }}>
         <nav> 
          <ul>
            
            <li><Link to="/Register">Register</Link></li>
            
          </ul>
        </nav>
      {!isLoggedIn ? (
        <div>
          <Input
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
         <Button 
  type="primary" 
  onClick={handleLogin} 
  style={{ 
    marginBottom: '10px', 
    backgroundColor: '#404141', // Set the button background color
    borderColor: '#404141', // Set the button border color (if needed)
    color: 'white' // Set the text color (if needed)
  }}
>
  Login
</Button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      ) : (
        <div>
          <h2>Welcome, User {userId}</h2>
          <h3>Your Recommendations:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {recommendations.map((hotel, index) => (
              <Card
              key={index}
              title={<span style={{ color: 'Black', fontSize: '1rem' }}>{hotel[0]}</span>} // Custom font color and size
              style={{ 
                width: 300, 
                backgroundColor: '#f0f2f5', // Custom background color
                border: '1px solid #d9d9d9', // Custom border color
              }}
              onClick={() => window.open(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.hotel)}`, "_blank")}
            >
              <p style={{ color: '#595959', fontWeight: 'bold' }}>Recommendation Score: {hotel[1].toFixed(2)}</p>
            </Card>
            
            ))}
          </div>
          <Button type="default" onClick={() => setIsLoggedIn(false)}>Logout</Button>
        </div>
      )}
      <PopularHotels/>

      <Footer/>
    </div>
  );
}

export default Login;
