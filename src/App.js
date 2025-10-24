
import React, { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import AdminLogin from "./pages/admin";
import Products from "./pages/adminproducts";
import Orders from "./pages/adminorders";
import Home from "./pages/home"; // <-- Home.jsx file

function App() {
  const [page, setPage] = useState("login"); // current page
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <div>
      {page === "login" && (
        <Login
          goToSignup={() => setPage("signup")}
          goToForgetPassword={() => setPage("forget")}
          goToHome={() => setPage("home")}  // Login button goes to Home.jsx
          goToAdminLogin={() => setPage("admin")}
        />
      )}
      {page === "signup" && <Signup goToLogin={() => setPage("login")} />}
      {page === "forget" && <ForgetPassword goToLogin={() => setPage("login")} />}
      {page === "home" && (
        <Home
          goToAdmin={() => setPage("admin")}
          goToProducts={() => setPage("products")}
          goToOrders={() => setPage("orders")}
          goToLogin={() => setPage("login")}
        />
      )}
      {page === "admin" && <AdminLogin goToUserLogin={() => setPage("login")} />}
      {page === "products" && <Products products={products} setProducts={setProducts} />}
      {page === "orders" && <Orders orders={orders} setOrders={setOrders} />}
    </div>
  );
}

export default App;
