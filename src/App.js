import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgetPassword from "./ForgetPassword";
import AdminLogin from "./admin";

function App() {
  const [page, setPage] = useState("login"); 
  // possible values: "login" | "signup" | "forget" | "admin"

  const handleSignup = (userData) => {
    console.log("New user signed up:", userData);
    setPage("login");
  };

  // Navigation functions
  const goToLogin = () => setPage("login");
  const goToSignup = () => setPage("signup");
  const goToForgetPassword = () => setPage("forget");
  const goToAdminLogin = () => setPage("admin");
  const goToUserLogin = () => setPage("login");

  return (
    <div style={styles.container}>
      {page === "login" && (
        <Login
          goToSignup={goToSignup}
          goToForgetPassword={goToForgetPassword}
        />
      )}

      {page === "signup" && (
        <Signup onSignup={handleSignup} goToLogin={goToLogin} />
      )}

      {page === "forget" && <ForgetPassword goToLogin={goToLogin} />}

      {page === "admin" && <AdminLogin goToUserLogin={goToUserLogin} />}

      {/* Admin login shortcut button visible on every page */}
      {page !== "admin" && (
        <button onClick={goToAdminLogin} style={styles.adminButton}>
          Admin Login
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    position: "relative",
  },
  adminButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default App;
