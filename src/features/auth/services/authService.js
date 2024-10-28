import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.carisini.my.id/api", // Ganti sesuai dengan URL API Anda
});

// Login user
export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Register user
export const register = async (userData) => {
  try {
    const response = await apiClient.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Fetch user profile (optional, depending on your API)
export const fetchUserProfile = async (token) => {
  try {
    const response = await apiClient.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Update user profile (optional, depending on your API)
export const updateUserProfile = async (token, userData) => {
  try {
    const response = await apiClient.put("/profile", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Logout user (optional, depending on your API)
export const logout = async (token) => {
  try {
    const response = await apiClient.post("/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
