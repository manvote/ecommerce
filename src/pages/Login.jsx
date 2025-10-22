import React, { useState } from "react";

function Login({ goToSignup, goToForgetPassword, goToHome }) {   // 👈 Added goToHome
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email.trim()) return setMessage("Please enter your email");
    if (!password.trim()) return setMessage("Please enter your password");

    // Dummy check (you can replace this with your real logic)
    if (email === "admin@gmail.com" && password === "123456") {
      setMessage("Login successful!");
      console.log({ email, password });

      // 👇 Navigate to Home page
      setTimeout(() => {
        goToHome();
      }, 800);
    } else {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

        <div style={styles.bottomButtons}>
          <span>Don't have an account?</span>
          <button type="button" style={styles.toggleButton} onClick={goToSignup}>
            Sign Up
          </button>
          <button type="button" style={styles.toggleButton} onClick={goToForgetPassword}>
            Forgot Password
          </button>
        </div>

        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" },
  form: { backgroundColor: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", width: "350px", display: "flex", flexDirection: "column", gap: "10px" },
  heading: { textAlign: "center", marginBottom: "10px", color: "#333" },
  input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" },
  button: { backgroundColor: "#4CAF50", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "14px" },
  bottomButtons: { display: "flex", flexDirection: "column", gap: "5px", marginTop: "10px", alignItems: "center" },
  toggleButton: { background: "none", border: "none", color: "#4CAF50", cursor: "pointer", fontWeight: "bold", textDecoration: "underline", padding: 0 },
  message: { color: "#e74c3c", textAlign: "center", marginTop: "5px" },
};

export default Login;
