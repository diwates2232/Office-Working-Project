import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Office Dashboard</h2>
      <ul>
        <li><Link to="/">Global Summary</Link></li>
        <li><Link to="/region-details">Region-wise Details</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
