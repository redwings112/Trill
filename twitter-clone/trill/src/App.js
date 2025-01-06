import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../src/components/Auth/SignIn";
import MainPage from "../src/components/MainPage/MainPage"; // Import MainPage
import Navbar from "../src/Shared/Navbar";
import Footer from "../src/Shared/Footer"; // Import Footer
import ProfilePage from "../src/components/ProfilePage/ProfilePage";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong!</h1>;
    }
    return this.props.children;
  }
}

// App Component
const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Navbar /> {/* Navbar Component */}
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/mainpage" element={<MainPage />} /> {/* Route to MainPage */}
          <Route path="/profilepage" element={<ProfilePage />} /> {/* Route to ProfilePage */}
          <Route path="/" element={<Navigate to="/signin" />} /> {/* Default route */}
        </Routes>
        <Footer /> {/* Footer Component */}
      </ErrorBoundary>
    </Router>
  );
};

export default App;
