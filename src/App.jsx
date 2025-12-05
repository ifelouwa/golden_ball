import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Products from "./pages/Products.jsx";
import Navbar from "./components/ui/Navbar.jsx";
import ProtectedRoute from "./components/ui/ProtectedRoute.jsx";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      </Routes>
    </Box>
  );
}

export default App;
