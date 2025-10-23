import React, { useState } from "react";

function AdminLogin({ goToUserLogin }) {
  // Default admin credentials
  const DEFAULT_EMAIL = "admin@example.com";
  const DEFAULT_PASSWORD = "admin123";

  const [adminEmail, setAdminEmail] = useState(DEFAULT_EMAIL);
  const [adminPassword, setAdminPassword] = useState(DEFAULT_PASSWORD);
  const [message, setMessage] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();

    const emailTrimmed = adminEmail.trim().toLowerCase();
    const passwordTrimmed = adminPassword.trim();

    if (!emailTrimmed) return setMessage("Please enter admin email");
    if (!passwordTrimmed) return setMessage("Please enter admin password");

    // Compare trimmed values
    if (emailTrimmed === DEFAULT_EMAIL && passwordTrimmed === DEFAULT_PASSWORD) {
      setMessage("Admin login successful!");
      console.log("Admin logged in:", emailTrimmed);
    } else {
      setMessage("Invalid admin credentials");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleAdminLogin} style={styles.form}>
        <h2 style={styles.heading}>Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

        <button
          type="button"
          onClick={goToUserLogin}
          style={styles.backButton}
        >
          Back to User Login
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  heading: { textAlign: "center", marginBottom: "10px", color: "#333" },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  backButton: {
    background: "none",
    border: "none",
    color: "#4CAF50",
    textDecoration: "underline",
    cursor: "pointer",
    marginTop: "5px",
  },
  message: { color: "#e74c3c", textAlign: "center", marginTop: "5px" },
};

export default AdminLogin;
