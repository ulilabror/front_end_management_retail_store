import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", // Ganti sesuai dengan URL API Anda
});

// Fetch all products
export const fetchProducts = async (page = 1) => {
  try {
    const response = await apiClient.get(`/products?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch a product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

// Search for products based on query
export const fetchSearchProducts = async (params = {}) => {
  try {
    const response = await apiClient.get("/products", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Add a new product
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
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id, token, formData) => {
  try {
    const response = await apiClient.put(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id, token) => {
  try {
    const response = await apiClient.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
