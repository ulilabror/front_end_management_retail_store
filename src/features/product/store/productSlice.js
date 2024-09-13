import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductById,
  postAddProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

// Async actions
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (page, thunkAPI) => {
    try {
      const response = await fetchProducts(page);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, thunkAPI) => {
    try {
      const response = await fetchProductById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ token, formData }, thunkAPI) => {
    try {
      const response = await postAddProduct(token, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, token, formData }, thunkAPI) => {
    try {
      const response = await updateProduct(id, token, formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async ({ id, token }, thunkAPI) => {
    try {
      const response = await deleteProduct(id, token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = [...state.products, ...action.payload.products]; // Append new products
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [...state.products, ...action.payload.products]; // Append products when fetch succeeds
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
