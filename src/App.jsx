import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Products from "./pages/Products.jsx";
import Navbar from "./components/ui/Navbar.jsx";
import ProtectedRoute from "./components/ui/ProtectedRoute.jsx";
import { Box } from "@chakra-ui/react";

// Main App component defining the application structure
function App() {
  return (
    // Full height container for the app
    <Box minH={"100vh"}>
      {/* Navigation bar at the top */}
      <Navbar />
      {/* Routing configuration */}
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home />} />
        {/* Login page route */}
        <Route path="/login" element={<Login />} />
        {/* Registration page route */}
        <Route path="/register" element={<Register />} />
        {/* Protected products page route */}
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      </Routes>
    </Box>
  );
}

// Export the App component as default
export default App;
