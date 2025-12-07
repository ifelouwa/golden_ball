import { createContext, useState, useEffect } from "react";
import api from "../api/api.client";
import { toaster } from "../components/ui/toaster";

// Create auth context
export const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  
  // Helper to get stored user from localStorage
  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  };
  // State for user and token
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // save and token to localStorage
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
  }, [user, token]);

  // Login function
    const login = async (email, password) => {
      try {
        const response = await api.post("/users/login", { email, password });
        const { user: userData, token: tokenValue, message } = response.data;
        setUser(userData);
        setToken(tokenValue);
        toaster.create({
          title: "Login Successful",
          description: message,
          type: "success",
        });
        return { success: true };
      } catch (error) {
        const message = error.response?.data?.message || "Login failed";
        toaster.create({
          title: "Login Failed",
          description: message,
          type: "error",
        });
        return { success: false, message };
      }
    };
  
    // Register function
      const register = async (name, username, email, password, phone) => {
        try {
          const response = await api.post("/users/register", { name, username, email, password, phone });
          const { user: userData, token: tokenValue, message } = response.data;
          setUser(userData);
          setToken(tokenValue);
          toaster.create({
            title: "Registration Successful",
            description: message,
            type: "success",
          });
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || "Registration failed";
          toaster.create({
            title: "Registration Failed",
            description: message,
            type: "error",
          });
          return { success: false, message };
        }
      };
    
      // Logout function
      const logout = () => {
    setUser(null);
    setToken("");
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
