// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute Component to protect routes
const PrivateRoute = ({ element, currentUser }) => {
  return currentUser ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;
