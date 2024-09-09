import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", // Ganti sesuai base URL API Anda
});

export const fetchProducts = async (page = 1) => {
  try {
    const response = await apiClient.get(`/products?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

export const fetchSearchProducts = async (params = {}) => {
  try {
    const response = await apiClient.get("/products", { params });
    return response.data; // Returns data with products and pagination
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const postAddProduct = async (token, formData) => {
  try {
    const response = await apiClient.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
