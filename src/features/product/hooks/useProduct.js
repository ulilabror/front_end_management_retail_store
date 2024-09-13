import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  removeProduct,
  setProducts,
} from "../store/productSlice"; // Assuming productSlice is where you export async thunks

const useProduct = () => {
  const dispatch = useDispatch();

  // Select product state from the Redux store
  const { products, product, loading, error } = useSelector(
    (state) => state.products
  ); // Assuming state.products is from the product slice

  // Fetch all products with optional pagination
  const fetchAllProducts = (page = 1) => {
    dispatch(getProducts(page));
  };

  const setAllProducts = (products) => {
    dispatch(setProducts(products));
  };
  // Fetch a product by ID
  const fetchProduct = (id) => {
    dispatch(getProductById(id));
  };

  // Add a new product
  const createProduct = (token, formData) => {
    dispatch(addProduct({ token, formData }));
  };

  // Edit an existing product
  const updateProduct = (id, token, formData) => {
    dispatch(editProduct({ id, token, formData }));
  };

  // Remove a product by ID
  const deleteProduct = (id, token) => {
    dispatch(removeProduct({ id, token }));
  };

  // Return the products, product, loading and error state along with the actions
  return {
    products,
    product,
    loading,
    error,
    setAllProducts,
    fetchAllProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProduct;
