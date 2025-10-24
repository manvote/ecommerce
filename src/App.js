import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/admin";
import Home from "./pages/home";
import ForgetPassword from "./pages/ForgetPassword";
import AdminProducts from "./pages/adminproducts";
import AdminOrders from "./pages/adminorders";

const ForgetPasswordWrapper = () => {
  const navigate = useNavigate();
  return <ForgetPassword goToLogin={() => navigate("/")} />;
};

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot" element={<ForgetPasswordWrapper />} />
        <Route
          path="/adminproducts"
          element={<AdminProducts products={products} setProducts={setProducts} />}
        />
        <Route
          path="/adminorders"
          element={<AdminOrders orders={orders} setOrders={setOrders} />}
        />
        
      </Routes>
    </Router>
  );
}

export default App;
