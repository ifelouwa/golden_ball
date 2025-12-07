import axios from "axios";
// Create axios instance with base URL

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://auction-web-application.vercel.app/api",
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  // Retrieve token from localStorage
  const token = localStorage.getItem("token");
  // Add Bearer token to headers if available
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
