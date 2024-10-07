import React, { useState } from 'react';
import { ref, set, get } from 'firebase/database';
import { database } from '../firebase'; 
import { Input, Button, message, Select } from 'antd'; 
import { useNavigate } from 'react-router-dom'; 

const { Option } = Select; // Destructure Option from Select

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState(''); // State for country
  const [city, setCity] = useState(''); // State for city
  const navigate = useNavigate(); 

  const generateNewUserId = async () => {
    try {
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
      const usersData = snapshot.val();
      const lastUserId = Math.max(...Object.keys(usersData).map(Number));
      return lastUserId + 1;
    } catch (error) {
      console.error('Error generating new user ID:', error);
      return 2001; // If error, start from 2001
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
        country: country, // Store country
        city: city, // Store city
        registered: true,
      });

      message.success(`Registration successful! Your User ID is ${newUserId}`);
      navigate('/login'); 
    } catch (error) {
      console.error('Error registering user:', error);
      message.error('Error registering user');
    }
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
        <Option value="USA">USA</Option>
        <Option value="Canada">Canada</Option>
        <Option value="UK">UK</Option>
        <Option value="France">France</Option>
        {/* Add more countries as needed */}
      </Select>
      <Select
        placeholder="Select City"
        value={city}
        onChange={(value) => setCity(value)}
        style={{ width: '100%', marginBottom: '10px' }}
      >
        <Option value="New York">New York</Option>
        <Option value="Toronto">Toronto</Option>
        <Option value="London">London</Option>
        <Option value="Paris">Paris</Option>
        {/* Add more cities based on the selected country */}
      </Select>
      <Button type="primary" onClick={handleRegister} style={{ marginBottom: '10px' }}>
        Register
      </Button>
    </div>
  );
}

export default Register;
