import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgetPassword from "./ForgetPassword";

function App() {
  const [page, setPage] = useState("login"); // "login" | "signup" | "forget"

  const handleSignup = (userData) => {
    console.log("New user signed up:", userData);
    setPage("login");
  };

  const goToLogin = () => setPage("login");
  const goToSignup = () => setPage("signup");
  const goToForgetPassword = () => setPage("forget"); // must match page state

  return (
    <div style={styles.container}>
      {page === "login" && (
        <Login goToSignup={goToSignup} goToForgetPassword={goToForgetPassword} />
      )}
      {page === "signup" && <Signup onSignup={handleSignup} goToLogin={goToLogin} />}
      {page === "forget" && <ForgetPassword goToLogin={goToLogin} />}
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
