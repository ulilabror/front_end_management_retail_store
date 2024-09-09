// src/services/authService.js
import axios from "axios";

export const login = async (credentials) => {
  const response = await axios.post(
    "http://localhost:8000/api/login",
    credentials
  );
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(
    "http://localhost:8000/api/register",
    userData
  );
  return response.data;
};
