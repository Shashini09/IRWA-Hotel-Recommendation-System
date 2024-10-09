import React, { useState, useEffect } from 'react';
import { ref, set, get } from 'firebase/database';
import { database } from '../firebase'; 
import { Input, Button, message, Select, Card, Row, Col } from 'antd'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add axios for API calls

const { Option } = Select;
const { Meta } = Card;

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [countries, setCountries] = useState([]); // State for countries
  const [cities, setCities] = useState([]); // State for cities
  const [recommendations, setRecommendations] = useState([]); // State to store recommendations
  const navigate = useNavigate(); // Navigation hook

  // Fetch countries and cities from the backend when the component is mounted
  useEffect(() => {
    const fetchCountriesAndCities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_countries_and_cities');
        if (response.data.status === 'success') {
          setCountries(response.data.countries);
          setCities(response.data.cities);
        } else {
          message.error('Failed to fetch countries and cities');
        }
      } catch (error) {
        console.error('Error fetching countries and cities:', error);
        message.error('Error fetching countries and cities');
      }
    };
    
    fetchCountriesAndCities();
  }, []);

  const generateNewUserId = async () => {
    try {
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
      const usersData = snapshot.val();
      const lastUserId = Math.max(...Object.keys(usersData).map(Number));
      return lastUserId + 1;
    } catch (error) {
      console.error('Error generating new user ID:', error);
      return 2001;
    }
  };

  const fetchRecommendations = async (userCountry, userCity) => {
    try {
      const response = await axios.post('http://localhost:5000/recommend_new', { 
        country: userCountry,
        city: userCity
      });
  
      if (Array.isArray(response.data) && response.data.length > 0) {
        setRecommendations(response.data.slice(0, 10)); // Set the recommendations and limit to 10
      } else {
        message.error('No hotels found for the selected location.'); 
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      message.error('Error fetching hotel recommendations. Please try again later.'); 
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !country || !city) {
      message.error('Please fill in all fields');
      return;
    }
  
    try {
      const newUserId = await generateNewUserId();
      const userRef = ref(database, `users/${newUserId}`);
      await set(userRef, {
        username: username,
        email: email,
        country: country, 
        city: city, 
        registered: true,
      });
  
      message.success(`Registration successful! Your User ID is ${newUserId}`);
  
      // Fetch hotel recommendations for the new user
      await fetchRecommendations(country, city);
  
      // No need to navigate away from this page
    } catch (error) {
      console.error('Error registering user:', error);
      message.error('Error registering user');
    }
  };

  // Handle "Go to Home" button click
  const handleGoToHome = () => {
    navigate('/'); // Replace '/home' with your actual home page route
  };

  return (
    <div className="register-page" style={{ padding: '50px' }}>
      <h2>Register</h2>
      <Input
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Input
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Select
        placeholder="Select Country"
        value={country}
        onChange={(value) => setCountry(value)}
        style={{ width: '100%', marginBottom: '10px' }}
      >
        {countries.map((country, index) => (
          <Option key={index} value={country}>
            {country}
          </Option>
        ))}
      </Select>
      <Select
        placeholder="Select City"
        value={city}
        onChange={(value) => setCity(value)}
        style={{ width: '100%', marginBottom: '10px' }}
        disabled={!country} // Disable city selection until a country is selected
      >
        {cities
          .filter((cityItem) => cityItem.country === country)
          .map((cityItem, index) => (
            <Option key={index} value={cityItem.city}>
              {cityItem.city}
            </Option>
          ))}
      </Select>
      <Button type="primary" onClick={handleRegister} style={{ marginBottom: '10px' }}>
        Register
      </Button>

      {recommendations.length > 0 && (
        <div>
          <h3>Recommended Hotels:</h3>
          <Row gutter={[16, 16]}>
            {recommendations.map((hotel, index) => (
              <Col key={index} span={8}>
                <Card
                  hoverable
                  title={hotel.hotelname}
                  cover={<img alt="hotel" src={hotel.imageUrl || 'default-hotel-image.jpg'} />}
                >
                  <Meta description={hotel.roomtype} />
                </Card>
              </Col>
            ))}
          </Row>

          {/* Go to Home Button */}
          <Button 
            type="primary" 
            onClick={handleGoToHome} 
            style={{ marginTop: '20px' }}
          >
            Go to Home
          </Button>
        </div>
      )}
    </div>
  );
}

export default Register;
