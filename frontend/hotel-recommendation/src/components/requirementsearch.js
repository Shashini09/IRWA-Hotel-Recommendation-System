import React, { useState } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'antd';

const { Meta } = Card;

function HotelSearch() {
  const [city, setCity] = useState('');
  const [number, setNumber] = useState(1);
  const [features, setFeatures] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchHotels = async () => {
    try {
      console.log("Sending data:", { city, number, features });
      const response = await axios.post('http://localhost:5000/search_hotels', {
        city: city,
        number: Number(number),
        features: features
      });
      console.log("Received response:", response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error("There was an error searching for hotels!", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Search Hotels by Requirement</h2>
      
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ marginRight: '10px', padding: '5px', width: '200px' }}
        />
        <input
          type="number"
          placeholder="Enter number of guests"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value, 10) || 1)}

          style={{ marginRight: '10px', padding: '5px', width: '150px' }}
        />
        <input
          type="text"
          placeholder="Enter required room features"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          style={{ marginRight: '10px', padding: '5px', width: '250px' }}
        />
        <button onClick={searchHotels} style={{ padding: '5px 15px' }}>Search</button>
      </div>

      <Row gutter={[16, 16]}>
        {searchResults.map((hotel, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{ width: '100%' }}
             
              onClick={() => window.open(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.hotelname)}`, "_blank")}
            >
              <Meta
                title={hotel.hotelname}
                description={
                  <>
                    <p>{hotel.roomtype}</p>
                    <p>{hotel.roomamenities}</p>
                    <p>Star Rating: {hotel.starrating}</p>
                    <p>Similarity Score: {hotel.similarity}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HotelSearch;
