import React, { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import AdminLogin from "./pages/admin";
import Home from "./pages/home";

function App() {
  const [page, setPage] = useState("login");

  // Navigation Handlers
  const goToSignup = () => setPage("signup");
  const goToLogin = () => setPage("login");
  const goToForgetPassword = () => setPage("forgetPassword");
  const goToAdminLogin = () => setPage("adminLogin");
  const goToUserLogin = () => setPage("login");
  const goToHome = () => setPage("home");

  return (
    <div>
      {page === "login" && (
        <Login
          goToSignup={goToSignup}
          goToForgetPassword={goToForgetPassword}
          goToHome={goToHome}
          goToAdminLogin={goToAdminLogin}
        />
      )}

      {page === "signup" && (
        <Signup goToLogin={goToLogin} onSignup={() => setPage("login")} />
      )}

      {page === "forgetPassword" && (
        <ForgetPassword goToLogin={goToLogin} />
      )}

      {page === "adminLogin" && (
        <AdminLogin goToUserLogin={goToUserLogin} />
      )}

      {page === "home" && <Home goToLogin={goToLogin} />}
    </div>
  );
}

export default App;
