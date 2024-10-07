import React from 'react';

// Main layout style
const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // Ensures the container takes full height
};

const mainContentStyle = {
  flex: '1', // Allows the main content to grow and push footer down
};

const footerStyle = {
  backgroundColor: '#333',
  color: 'white',
  textAlign: 'center',
  padding: '10px 0',
};

const linkStyle = {
  color: '#4CAF50',
};

const Footer = () => {
  return (
    <div style={layoutStyle}>
      <main style={mainContentStyle}>
        {/* Your main content goes here */}
      </main>
      <footer style={footerStyle}>
        <p style={{ margin: '0' }}>&copy; 2024 Hotel Recommendation System. All Rights Reserved.</p>
        <p style={{ margin: '0' }}>
          Contact us: <a href="mailto:info@hotelrecommend.com" style={linkStyle}>info@hotelrecommend.com</a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
