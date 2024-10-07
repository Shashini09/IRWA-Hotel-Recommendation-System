import React, { useState, useEffect } from 'react';
import { Select, Button, Card, Row, Col } from 'antd';

const { Option } = Select;

const Search = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Fetch available room types, countries, and cities
  useEffect(() => {
    fetch('http://localhost:5000/get-hotel-data') // Adjust to your backend API
      .then(res => res.json())
      .then(data => {
        setRoomTypes(data.room_types);
        setCountries(data.countries);
      })
      .catch(err => console.error("Error fetching hotel data:", err));
  }, []);

  // Update city options when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      fetch(`http://localhost:5000/get-cities?country=${selectedCountry}`)
        .then(res => res.json())
        .then(data => {
          setCities(data.cities);
        })
        .catch(err => console.error("Error fetching cities:", err));
    }
  }, [selectedCountry]);

  const handleRecommend = () => {
    const requestData = {
      room_type: selectedRoomType,
      country: selectedCountry,
      city: selectedCity
    };

    fetch('http://localhost:5000/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setRecommendations(data.recommendations);
        } else {
          console.error("No recommendations found");
        }
      })
      .catch(err => console.error("Error fetching recommendations:", err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search for Hotels</h2>
      
      <Row gutter={16}>
        <Col span={8}>
          <Select
            placeholder="Select Room Type"
            style={{ width: '100%' }}
            onChange={value => setSelectedRoomType(value)}
          >
            {roomTypes.map(type => (
              <Option key={type} value={type}>{type}</Option>
            ))}
          </Select>
        </Col>

        <Col span={8}>
          <Select
            placeholder="Select Country"
            style={{ width: '100%' }}
            onChange={value => setSelectedCountry(value)}
          >
            {countries.map(country => (
              <Option key={country} value={country}>{country}</Option>
            ))}
          </Select>
        </Col>

        <Col span={8}>
          <Select
            placeholder="Select City"
            style={{ width: '100%' }}
            onChange={value => setSelectedCity(value)}
            disabled={!selectedCountry}
          >
            {cities.map(city => (
              <Option key={city} value={city}>{city}</Option>
            ))}
          </Select>
        </Col>
      </Row>

      <div style={{ marginTop: '20px' }}>
        <Button type="primary" onClick={handleRecommend}>Recommend Hotels</Button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Hotel Recommendations:</h3>
        <Row gutter={16}>
          {recommendations.map((hotel, index) => (
            <Col key={index} span={8}>
              <Card
                title={hotel.hotelname}
                style={{ marginBottom: '20px' }}
              >
                <p>Room Type: {hotel.roomtype}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Search;
