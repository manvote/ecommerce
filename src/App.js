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
import CartPage from "./pages/CartPage";
import MiniCart from "./pages/MiniCart";
import CheckoutWizard from "./pages/CheckoutWizard";
import OrderHistory from "./pages/OrderHistory";
import { CartProvider } from "./pages/CartContext";
import Profile from "./pages/Profile";

const ForgetPasswordWrapper = () => {
  const navigate = useNavigate();
  return <ForgetPassword goToLogin={() => navigate("/")} />;
};

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  return (
    <CartProvider>
      <Router>
        {/* Show MiniCart only when user is logged in */}

        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
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
          <Route path="/cart" element={<CartPage />} />
          
          {/* Added Checkout and Order History routes */}
          <Route path="/checkout" element={<CheckoutWizard />} />
          <Route path="/orders" element={<OrderHistory user={user} />} />
          <Route path="/orderhistory" element={<OrderHistory user={user} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
