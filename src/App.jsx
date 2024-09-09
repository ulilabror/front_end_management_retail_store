import "./index.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import products from "./data/productsData";
import LoadingScreen from "./components/common/loadingScreen";

const MainPage = React.lazy(() => import("./pages/MainPage"));
const LoginPage = React.lazy(() => import("./features/auth/pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./features/auth/pages/RegisterPage"))
const ProductDetail = React.lazy(() => import("./features/product/pages/ProductDetailPage"))
const ProductList = React.lazy(() => import("./features/product/pages/ProductListpage"))
const PPOBPage = React.lazy(() => import("./pages/PPOBPage"));
const AddProductPage = React.lazy(() => import("./features/product/pages/AddProductPage"));
export default function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductList products={products} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} />} />
            <Route path="/ppob" element={<PPOBPage />} />
            <Route path="/addproduct" element={<AddProductPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
