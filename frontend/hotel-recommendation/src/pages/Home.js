import React , {useState} from "react";
import { Link } from 'react-router-dom';
import Header  from "../components/header";
import Footer from "../components/footer";
import '../styels/styles.css'
import DynamicBackground from "../components/DynamicBackground";
import Feedback from "../components/Feedback";

import HotelSearch from "../components/requirementsearch";






function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <DynamicBackground />
      </div>
      <div style={{ zIndex: 2 }}>
        <Feedback />
      </div>
      <div style={{ marginTop: 'auto', zIndex: 3 }}>
        <Footer />
      </div>
    </div>
  );
  }

export default Home;