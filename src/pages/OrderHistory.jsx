import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaShoppingCart, FaHome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
const OrderHistory = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const userOrders = allOrders.filter(o => o.user?.email === user?.email);
    setOrders(userOrders);
  }, [user]);

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
    searchWrapper: {
      display: "flex",
      flex: "1 1 300px",
      minWidth: "200px",
      maxWidth: "500px",
      alignItems: "center",
      gap: "10px"
    },
    searchInput: { flex: 1, padding: "10px", borderRadius: "6px", border: "none", minWidth: "100px" },
    searchButton: { padding: "10px 12px", borderRadius: "4px", border: "none", background: "#ff9900", color: "#fff", fontWeight: "bold", cursor: "pointer" },
    userCart: { display: "flex", gap: "30px", alignItems: "center" },
    pageWrap: { padding: "20px", maxWidth: "1100px", margin: "0 auto", minHeight: "100vh" },
    pageTitle: { textAlign: "center", fontSize: "2rem", marginBottom: "30px", color: "#333" },
    tableWrap: { overflowX: "auto", marginTop: "20px" },
    table: { width: "100%", borderCollapse: "collapse", minWidth: "720px" },
    th: { padding: "12px", background: "linear-gradient(90deg, #1976d2, #42a5f5)", color: "white", textTransform: "uppercase", fontSize: "14px", letterSpacing: "0.6px" },
    td: { padding: "12px", borderBottom: "1px solid #eef6ff", textAlign: "center", fontSize: "14px" },
    trOdd: { background: "#f7fbff" },
    trEven: { background: "#eef6ff" },
    itemDiv: { marginBottom: "4px" },
    emptyText: { textAlign: "center", marginTop: "20px" },
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
          {/* Account Dropdown */}
          <div style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
              onClick={() => setShowDropdown(prev => !prev)}
            >
              <FaUserAlt /> Account ▾
            </span>

            {showDropdown && (
              <div style={{
                position: "absolute",
                top: "35px",
                right: 0,
                background: "#fff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "6px",
                overflow: "hidden",
                minWidth: "150px",
                zIndex: 2000,
              }}>
                <div
                  style={{ padding: "10px 15px", cursor: "pointer", borderBottom: "1px solid #eee", color: "#333" }}
                  onClick={() => { navigate("/OrderHistory"); setShowDropdown(false); }}
                >
                  Order History
                </div>
                <div
                  style={{ padding: "10px 15px", cursor: "pointer", color: "#333" }}
                  onClick={() => { navigate("/profile"); setShowDropdown(false); }}
                >
                  Profile
                </div>
              </div>
            )}
          </div>

          {/* Cart & Home */}
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/cart")}>
            <FaShoppingCart /> Cart
          </span>
          <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }} onClick={() => navigate("/home")}>
            <FaHome /> Home
          </span>
        </div>
      </div>

      {/* Page Content */}
      <div style={styles.pageWrap}>
        <h2 style={styles.pageTitle}>Order History</h2>

        {orders.length === 0 ? (
          <p style={styles.emptyText}>No orders placed yet</p>
        ) : (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Total</th>
                  <th style={styles.th}>Items</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td style={styles.td}>{order.id}</td>
                    <td style={styles.td}>{order.placedAt}</td>
                    <td style={styles.td}>₹{order.total}</td>
                    <td style={styles.td}>
                      {order.items.map(item => (
                        <div key={item.id} style={styles.itemDiv}>
                          {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
