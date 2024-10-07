import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const headerStyle = {
    backgroundColor: '#333',
    padding: '20px',
    textAlign: 'center',
    color: 'white',
  };

  return (
    <header style={headerStyle}>
       <nav> 
          <ul>
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/Register">Register</Link></li>
            
          </ul>
        </nav>
    </header>
  );
};

export default Header;
