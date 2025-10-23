import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Products from "./pages/products";
import Orders from "./pages/orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/home";
import AdminLogin from "./pages/admin";

function App() {
  // ---- Admin module state (persist to localStorage) ----
  const [products, setProducts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("products") || "[]");
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("orders") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ---- Auth state ----
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <Router>
        <div >
       
        <Routes>
          {/* Public/Auth Routes */}
          <Route path="/" element={<Login goToSignup={() => setIsUserLoggedIn(false)} />} />
          <Route path="/signup" element={<Signup onSignup={() => setIsUserLoggedIn(true)} />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/admin-login" element={<AdminLogin goToUserLogin={() => setIsAdmin(false)} />} />

          {/* Publicly accessible routes */}
          <Route
            path="/products"
            element={<Products products={products} setProducts={setProducts} />}
          />
          <Route
            path="/orders"
            element={<Orders orders={orders} setOrders={setOrders} products={products} />}
          />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>

        {/* Navigation bar */}
        
      </div>
    </Router>
  );



};

export default App;
