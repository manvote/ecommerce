import React, { useState } from "react";
import { useCart } from "./CartContext.jsx";
import CheckoutWizard from "./CheckoutWizard.jsx";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaShoppingCart, FaHome } from "react-icons/fa";
import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
const CartPage = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  if (checkout) {
    return <CheckoutWizard />;
  }

  const styles = {
    container: { paddingTop: "50px", fontFamily: "Poppins, sans-serif", background: "#f0f4f8", minHeight: "100vh" },
    navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", background: "linear-gradient(90deg, #ff6a00, #ff2a5a, #9e2af9, #2196f3)", color: "#fff", fontWeight: "bold", gap: "50px", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 },
    logo: { fontWeight: "bold", fontSize: "20px", cursor: "pointer" },
    searchWrapper: { display: "flex", flex: "1 1 300px", minWidth: "200px", maxWidth: "500px", alignItems: "center", gap: "10px" },
    searchInput: { flex: 1, padding: "10px", borderRadius: "6px", border: "none", minWidth: "100px" },
    searchButton: { padding: "10px 12px", borderRadius: "4px", border: "none", background: "#ff9900", color: "#fff", fontWeight: "bold", cursor: "pointer" },
    userCart: { display: "flex", gap: "30px", alignItems: "center" },
    pageWrap: { padding: "20px", maxWidth: "900px", margin: "0 auto", minHeight: "100vh" },
    pageTitle: { textAlign: "center", fontSize: "2rem", marginBottom: "30px", color: "#333" },
    cartItem: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", padding: "15px 20px", borderRadius: "8px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)", flexWrap: "wrap", transition: "box-shadow 0.2s" },
    cartImage: { width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px" },
    cartInfo: { flex: 1, marginLeft: "20px", display: "flex", flexDirection: "column", gap: "10px" },
    quantityControls: { display: "flex", alignItems: "center", gap: "10px" },
    qtyBtn: { background: "#ff9900", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
    cartActions: { display: "flex", flexDirection: "column", gap: "10px", textAlign: "right" },
    cartItemTotal: { fontWeight: "bold" },
    btnRemove: { background: "#ff4d4f", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "0.9rem" },
    cartTotal: { marginTop: "20px", textAlign: "right" },
    totalH3: { fontSize: "1.5rem", marginBottom: "10px" },
    btnCheckout: { padding: "12px 20px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", border: "none", background: "#28a745", color: "white", marginLeft: "10px" },
    btnClear: { padding: "12px 20px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", border: "none", background: "#dc3545", color: "white" },
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
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <FaUserAlt /> Account ▾
            </span>

            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "35px",
                  right: 0,
                  background: "#fff",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "6px",
                  overflow: "hidden",
                  minWidth: "150px",
                  zIndex: 2000,
                }}
              >
                <div
                  style={{ padding: "10px 15px", cursor: "pointer", borderBottom: "1px solid #eee", color: "#333" }}
                  onClick={() => { navigate("/OrderHistory"); setShowDropdown(false); }}
                >
                  Order History
                </div>
                <div
                      style={{
                        padding: "10px 15px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                        color: "#333",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      onClick={() => {
                        navigate("/wishlist"); // your wishlist route
                        setShowDropdown(false);
                      }}
                    >
                      <FaHeart /> Wishlist
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

          {/* Cart */}
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/cart")}>
            <FaShoppingCart /> Cart
          </span>

          {/* Home */}
          <span
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <FaHome /> Home
          </span>
        </div>
      </div>

      {/* Cart Content */}
      <div style={styles.pageWrap}>
        <h1 style={styles.pageTitle}>Shopping Cart</h1>

        {cart.length === 0 ? (
          <p style={{ textAlign: "center" }}>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <img src={item.image} alt={item.name} style={styles.cartImage} />
                <div style={styles.cartInfo}>
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <div style={styles.quantityControls}>
                    <button style={styles.qtyBtn} onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button style={styles.qtyBtn} onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </div>
                <div style={styles.cartActions}>
                  <span style={styles.cartItemTotal}>₹{item.price * item.quantity}</span>
                  <button style={styles.btnRemove} onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}

            <div style={styles.cartTotal}>
              <h3 style={styles.totalH3}>Total: ₹{totalPrice()}</h3>
              <div>
                <button style={styles.btnClear} onClick={clearCart}>Clear Cart</button>
                <button style={styles.btnCheckout} onClick={() => setCheckout(true)}>Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
