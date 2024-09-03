import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/authSlice";
// import productsReducer from "../features/products/store/productsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  //   products: productsReducer,
});

export default rootReducer;
