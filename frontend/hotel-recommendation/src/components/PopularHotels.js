import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
//import 'antd/dist/antd.css';  // Import Ant Design styles

const { Meta } = Card;  // Meta component for card title and description

const PopularHotels = () => {
  const [popularHotels, setPopularHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('http://localhost:5000/popular?top=10')  // Adjust the URL as needed
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setPopularHotels(data.popular_hotels);
        } else {
          setError(data.message || 'Failed to fetch popular hotels.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching data.');
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color:'#ff4000' }}>Most Popular Hotels</h2>
      <Row gutter={[16, 16]}>
        {popularHotels.map((hotel, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{ width: '100%' }}
             
              onClick={() => window.open(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.hotel)}`, "_blank")}
            >
              <Meta
                title={hotel.hotel}
                description={`${hotel.ratings_count} ratings`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PopularHotels;
