import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaShoppingCart, FaHome } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) {
      navigate("/"); // redirect to login if no user
    } else {
      setUser(loggedUser);
    }
  }, [navigate]);

  const styles = {
    container: { paddingTop: "90px", fontFamily: "Poppins, sans-serif", background: "#f0f4f8", minHeight: "100vh" },
    navbar: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      background: "linear-gradient(90deg, #ff6a00, #ff2a5a, #9e2af9, #2196f3)",
      color: "#fff",
      fontWeight: "bold",
      gap: "50px",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
    },
    logo: { fontWeight: "bold", fontSize: "20px", cursor: "pointer" },
    searchWrapper: { display: "flex", flex: "1 1 300px", minWidth: "200px", maxWidth: "500px", alignItems: "center", gap: "10px" },
    searchInput: { flex: 1, padding: "10px", borderRadius: "6px", border: "none", minWidth: "100px" },
    searchButton: { padding: "10px 12px", borderRadius: "4px", border: "none", background: "#ff9900", color: "#fff", fontWeight: "bold", cursor: "pointer" },
    userCart: { display: "flex", gap: "30px", alignItems: "center" },
    pageWrap: { padding: "20px", maxWidth: "800px", margin: "0 auto", minHeight: "100vh" },
    pageTitle: { textAlign: "center", fontSize: "2rem", marginBottom: "30px", color: "#333" },
    card: { background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "center" },
    field: { marginBottom: "12px", fontSize: "16px", color: "#555" },
    logoutButton: { marginTop: "20px", padding: "10px 20px", border: "none", borderRadius: "8px", background: "#ff4d4f", color: "#fff", cursor: "pointer", fontWeight: "bold" }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate("/home")}>MyShop</div>

        <div style={styles.searchWrapper}>
          <input type="text" placeholder="Search products..." style={styles.searchInput} />
          <button style={styles.searchButton}>Search</button>
        </div>

        <div style={styles.userCart}>
          <span><FaUserAlt /> Account</span>
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/cart")}><FaShoppingCart /> Cart</span>
          <span onClick={() => navigate("/home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}><FaHome /> Home</span>
        </div>
      </div>

      {/* Profile content */}
      <div style={styles.pageWrap}>
        <h2 style={styles.pageTitle}>My Profile</h2>

        {user ? (
          <div style={styles.card}>
            <div style={styles.field}><strong>Name:</strong> {user.name || "Admin"}</div>
            <div style={styles.field}><strong>Email:</strong> {user.email}</div>
            <div style={styles.field}><strong>Role:</strong> {user.role || "User"}</div>
            <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No user data found. Please log in again.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
