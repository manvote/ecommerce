import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const DEFAULT_EMAIL = "admin@example.com";
  const DEFAULT_PASSWORD = "admin123";

  const [adminEmail, setAdminEmail] = useState(DEFAULT_EMAIL);
  const [adminPassword, setAdminPassword] = useState(DEFAULT_PASSWORD);
  const [message, setMessage] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (
      adminEmail.trim().toLowerCase() === DEFAULT_EMAIL &&
      adminPassword.trim() === DEFAULT_PASSWORD
    ) {
      setMessage("Admin login successful!");
      navigate("/adminproducts"); // ✅ redirect to AdminProducts
    } else {
      setMessage("Invalid admin credentials");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.logo}>MyStore Admin</h1>
      </div>

      <div style={styles.centerContainer}>
        <form onSubmit={handleAdminLogin} style={styles.container}>
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
<p style={styles.bottomText}>
  Back to{" "}
  <button
    type="button"  // ✅ prevents form submission
    onClick={() => navigate("/")}
    style={styles.linkButton}
  >
    User Login
  </button>
</p>
          
  

          {message && <p style={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
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
     header: { 
      background: "linear-gradient(90deg, var(--brand-1), var(--brand-2), var(--accent-1))", 
      color: "#fff", 
      display: "flex", 
      justifyContent: "center", 
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
    
    centerContainer: { 
      flex: 1, 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
    }, 
    container: { 
      backgroundColor: "var(--card-bg)", 
      padding: "40px 30px", 
      borderRadius: "12px", 
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)", 
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
     input: { 
      padding: "12px", 
      borderRadius: "8px", 
      border: "1px solid #ccc", 
      fontSize: "14px", 
      width: "100%", 
      outline: "none", 
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
      width: "100%", 
      transition: "0.3s", 
    }, 
    
    bottomText: { 
      fontSize: "13px", 
      marginTop: "10px", 
    }, 
    
    linkButton: { 
      background: "none", 
      border: "none", 
      color: "var(--accent-1)",
      cursor: "pointer", 
      fontWeight: "bold", 
      textDecoration: "underline", 
      padding: 0, 
      fontSize: "14px", 
    }, 
    
    message: { 
      color: "#e74c3c", 
      textAlign: "center", 
      marginTop: "5px", 
    },
}
    // accent color cursor: "pointer", fontWeight: "bold", textDecoration: "underline", padding: 0, fontSize: "14px", }, message: { color: "#e74c3c", textAlign: "center", marginTop: "5px", }, };

export default AdminLogin;
