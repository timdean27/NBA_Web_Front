// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the CSS file

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/HeatmapPage">Heatmap</Link>
    </nav>
  );
};

export default Navbar;
