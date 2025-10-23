import React, { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/home";
import AdminLogin from "./pages/admin";

function App() {
  const [page, setPage] = useState("login"); 
  // possible values: "login" | "signup" | "forget" | "home" | "admin"

  const handleSignup = (userData) => {
    console.log("New user signed up:", userData);
    setPage("login");
  };

  // Navigation functions
  const goToLogin = () => setPage("login");
  const goToSignup = () => setPage("signup");
  const goToForgetPassword = () => setPage("forget");
  const goToHome = () => setPage("home");
  const goToAdminLogin = () => setPage("admin");
  const goToUserLogin = () => setPage("login");

 return (
  <div style={styles.container}>
    {page === "login" && (
      <>
        <Login
          goToSignup={goToSignup}
          goToForgetPassword={goToForgetPassword}
          goToHome={goToHome}
        />
        <button onClick={goToAdminLogin} style={styles.adminButton}>
          Admin Login
        </button>
      </>
    )}

    {page === "signup" && (
      <Signup onSignup={handleSignup} goToLogin={goToLogin} />
    )}

    {page === "forget" && <ForgetPassword goToLogin={goToLogin} />}

    {page === "home" && <Home />}

    {page === "admin" && <AdminLogin goToUserLogin={goToUserLogin} />}
  </div>
);

}

const styles = {
 
 
};

export default App;
