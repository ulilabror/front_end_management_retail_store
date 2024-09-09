import { useState } from "react";

export const useToken = () => {
  // Get initial token from localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const [token, setTokenState] = useState(getToken());

  // Save token in state and localStorage
  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenState(newToken);
  };

  // Remove token from state and localStorage
  const removeToken = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    setTokenState(null);
  };

  return {
    token,
    setToken,
    removeToken,
  };
};
