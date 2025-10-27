// CheckoutWizard.jsx
import React, { useState } from "react";
import { useCart } from "./CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaShoppingCart, FaHome } from "react-icons/fa";
import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
const CheckoutWizard = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({ name: "", address: "", phone: "" });
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleContinuePayment = () => {
    const { name, address, phone } = shipping;
    if (!name || !address || !phone) {
      alert("Please fill all shipping details.");
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: totalPrice(),
      shipping,
      user: JSON.parse(localStorage.getItem("user")),
      status: "Pending",
      placedAt: new Date().toLocaleString(),
    };

    const updatedOrders = [...storedOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    clearCart();
    setStep(3);
  };

  // Inline styles
  const styles = {
    container: { paddingTop: "40px", fontFamily: "Poppins, sans-serif", background: "#f0f4f8", minHeight: "100vh" },
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
    searchWrapper: { display: "flex", 
                   flex: "1 1 300px", 
                   minWidth: "200px", 
                   maxWidth: "500px", 
                   alignItems: "center", 
                   gap: "10px" },
    searchInput: { flex: 1,padding: "10px", borderRadius: "6px", border: "none",minWidth: "100px" },
    searchButton: { padding: "10px 12px", borderRadius: "4px", border: "none", background: "#ff9900", color: "#fff", fontWeight: "bold", cursor: "pointer" },
    userCart: { display: "flex", gap: "30px", alignItems: "center" },

    pageWrap: {
      padding: "20px",
      maxWidth: "700px",
      margin: "0 auto",
      minHeight: "100vh",
      background: "#f0f4f8",
      textAlign: "center",
    },
    cardStyle: {
      maxWidth: "500px",
      margin: "0 auto",
      padding: "30px",
      textAlign: "center",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    },
    inputStyle: {
      width: "100%",
      padding: "12px 15px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "1rem",
      outline: "none",
    },
    btnStyle: {
      width: "100%",
      padding: "12px 20px",
      marginTop: "20px",
      border: "none",
      borderRadius: "8px",
      fontWeight: "bold",
      background: "#28a745",
      color: "#fff",
      cursor: "pointer",
    },
    progressStep: (index) => ({
      flex: 1,
      textAlign: "center",
      padding: "10px",
      borderRadius: "20px",
      background: step > index ? "#ff9900" : "#ddd",
      color: step > index ? "#fff" : "#555",
      fontWeight: 700,
      transition: "all 0.3s",
    }),
  };

  return (
    <div style={styles.container}>
      {/* ===== Navbar ===== */}
      <div style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate("/home")}>MyShop</div>

        <div style={styles.searchWrapper}>
          <input type="text" placeholder="Search products..." style={styles.searchInput} />
          <button style={styles.searchButton}>Search</button>
        </div>

        <div style={styles.userCart}>
          <div style={styles.userCart}>
              {/* Account Dropdown */}
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
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
                      style={{
                        padding: "10px 15px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                        color: "#333",
                      }}
                      onClick={() => {
                        navigate("/OrderHistory");
                        setShowDropdown(false);
                      }}
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
                      style={{
                        padding: "10px 15px",
                        cursor: "pointer",
                        color: "#333",
                      }}
                      onClick={() => {
                        navigate("/profile");
                        setShowDropdown(false);
                      }}
                    >
                      Profile
                    </div>
                  </div>
                )}
              </div>
          
              {/* Cart */}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/cart")}
              >
                <FaShoppingCart /> Cart
              </span>
          
              {/* Home */}
              <span
                onClick={() => navigate("/home")}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <FaHome /> Home
              </span>
            </div>
          <span onClick={() => navigate("/home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
            <FaHome /> Home
          </span>
        </div>
      </div>

      {/* ===== Checkout Content ===== */}
      <div style={styles.pageWrap}>
        <h1 style={{ fontSize: "2rem", marginBottom: "30px" }}>Checkout</h1>

        {/* Progress */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px", gap: "20px" }}>
          {["Shipping", "Payment", "Done"].map((label, index) => (
            <div key={index} style={styles.progressStep(index)}>{label}</div>
          ))}
        </div>

        <div style={styles.cardStyle}>
          {/* Step 1: Shipping */}
          {step === 1 && (
            <>
              <h3>Shipping Information</h3>
              <input style={styles.inputStyle} type="text" name="name" placeholder="Full Name" value={shipping.name} onChange={handleShippingChange} />
              <input style={styles.inputStyle} type="text" name="address" placeholder="Address" value={shipping.address} onChange={handleShippingChange} />
              <input style={styles.inputStyle} type="text" name="phone" placeholder="Phone" value={shipping.phone} onChange={handleShippingChange} />
              <button style={styles.btnStyle} onClick={handleContinuePayment}>Continue to Payment</button>
            </>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <>
              <h3>Payment Method</h3>
              <p>Cash on Delivery (COD)</p>
              <h4>Order Summary:</h4>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <div>{item.name} x {item.quantity}</div>
                  <div>₹{item.price * item.quantity}</div>
                </div>
              ))}
              <h3>Total: ₹{totalPrice()}</h3>
              <button style={styles.btnStyle} onClick={handlePlaceOrder}>Place Order</button>
            </>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <>
              <div style={{ fontSize: "3rem", color: "#ff9900", marginBottom: "15px" }}>✅</div>
              <h2>Order Placed Successfully!</h2>
              <p>Thank you, <strong>{shipping.name}</strong></p>
              <p>Your order will be delivered to:</p>
              <p>{shipping.address}</p>
              <p>Phone: {shipping.phone}</p>
              <button style={styles.btnStyle} onClick={() => navigate("/orders")}>View Order History</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutWizard;
