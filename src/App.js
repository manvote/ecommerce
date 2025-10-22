import React, { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/home";

function App() {
  const [page, setPage] = useState("login"); // "login" | "signup" | "forget" | "home"

  const handleSignup = (userData) => {
    console.log("New user signed up:", userData);
    setPage("login");
  };

  // 🔸 Navigation functions
  const goToLogin = () => setPage("login");
  const goToSignup = () => setPage("signup");
  const goToForgetPassword = () => setPage("forget");
  const goToHome = () => setPage("home");

  return (
    <div style={styles.container}>
      {page === "login" && (
        <Login
          goToSignup={goToSignup}
          goToForgetPassword={goToForgetPassword}
          goToHome={goToHome}
        />
      )}
      {page === "signup" && (
        <Signup onSignup={handleSignup} goToLogin={goToLogin} />
      )}
      {page === "forget" && (
        <ForgetPassword goToLogin={goToLogin} />
      )}
      {page === "home" && (
        <Home />
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
  },
};

export default App;
