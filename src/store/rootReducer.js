import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/authSlice";
import productReducer from "../features/product/store/productSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
});

export default rootReducer;
