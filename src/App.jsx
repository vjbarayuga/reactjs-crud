import './App.css';
import React from 'react';
//import { Link } from 'react-router-dom';
import MyRouter from './router/index.js';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      {/* <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/contact-us">Contact Us</Link> */}

      <Navbar />

      <MyRouter />
    </div>
  );
}

export default App;
