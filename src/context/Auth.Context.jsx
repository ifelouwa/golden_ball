import { createContext, useState, useEffect } from "react";
import api from "../api/api.client";
import { toaster } from "../components/ui/toaster";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  };
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
  }, [user, token]);

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
