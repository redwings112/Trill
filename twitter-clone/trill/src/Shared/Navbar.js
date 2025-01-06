import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // For navigating to other pages
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Navbar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate(); // Hook to navigate to the sign-in page or main page

  const handleSignOut = async () => {
    try {
      // Sign out user from Firebase
      await signOut(auth);

      // Clear currentUser state (local state)
      setCurrentUser(null);

      // Redirect to the sign-in page
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleTrillClick = () => {
    // Redirect to the main page when "Trill" is clicked
    navigate("/mainpage");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={handleTrillClick}>
          Trill
        </Typography>
        <Box>
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            Welcome, {currentUser || "Guest"}!
          </Typography>
          {currentUser && (
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
serve
export default Navbar;
