import React, { useState } from "react";

function Login({ goToSignup, goToForgetPassword, goToHome, goToAdminLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim()) return setMessage("Please enter your email");
    if (!password.trim()) return setMessage("Please enter your password");

    if (email === "admin@gmail.com" && password === "123456") {
      setMessage("Login successful!");
      setTimeout(() => goToHome(), 800);
    } else {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div style={styles.page}>
      {/* 🌈 Gradient Header */}
      <div style={styles.header}>
        <h1 style={styles.logo}>MyStore</h1>

        {/* 🧭 Admin Login Button */}
        <button style={styles.adminButton} onClick={goToAdminLogin}>
          Admin Login
        </button>
      </div>

      {/* 💳 Login Card */}
      <div style={styles.container}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={styles.heading}>Welcome Back 👋</h2>
          <p style={styles.subHeading}>Login to continue</p>

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
            <button
              type="button"
              style={styles.linkButton}
              onClick={goToForgetPassword}
            >
              Forgot Password?
            </button>
            <span>
              Don’t have an account?{" "}
              <button
                type="button"
                style={styles.linkButton}
                onClick={goToSignup}
              >
                Sign Up
              </button>
            </span>
          </div>

          {message && <p style={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  // 🎨 Theme Colors
  page: {
    "--accent-1": "#1976d2",
    "--accent-2": "#42a5f5",
    "--brand-1": "#ff6a00",
    "--brand-2": "#ee0979",
    "--bg": "#f0f4f8",
    "--card-bg": "#ffffff",

    backgroundColor: "var(--bg)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  // 🌈 Gradient Header
  header: {
    background: "linear-gradient(90deg, var(--brand-1), var(--brand-2), var(--accent-1))",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },

  logo: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },

  adminButton: {
    background: "linear-gradient(90deg, var(--accent-1), var(--accent-2))",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "0.3s",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  form: {
    backgroundColor: "var(--card-bg)",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    textAlign: "center",
  },

  heading: {
    color: "var(--accent-1)",
    marginBottom: "0",
  },

  subHeading: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    transition: "0.3s",
  },

  button: {
    background: "linear-gradient(90deg, var(--brand-1), var(--brand-2))",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    marginTop: "10px",
    transition: "0.3s",
  },

  bottomButtons: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  linkButton: {
    background: "none",
    border: "none",
    color: "var(--accent-1)",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
    padding: 0,
    fontSize: "13px",
  },

  message: {
    color: "crimson",
    marginTop: "5px",
    fontSize: "13px",
  },
};

export default Login;
