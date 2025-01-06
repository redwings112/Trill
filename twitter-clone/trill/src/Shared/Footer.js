import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data or authentication token (example using localStorage)
    localStorage.removeItem('authToken'); // Adjust based on your storage method

    // Optionally, you can also clear sessionStorage or any other stored data
    // sessionStorage.removeItem('user'); 

    // Navigate to the signin page after logout
    navigate('/signin');  // Redirect to signin page after logout
  };

  // Function to navigate to profile page or other pages
  const handleNavigation = () => {
    navigate('/profilepage');  // Navigating to the profile page
  };

  return (
    <footer>
      <button onClick={handleNavigation}>Profile Page</button>
      
      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>
    </footer>
  );
};

export default Footer;
