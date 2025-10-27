import React, { useState } from "react";
import { useCart } from "./CartContext";
import { FaShoppingCart } from "react-icons/fa";

const MiniCart = ({ setPage }) => {
  const { cart, totalPrice } = useCart();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const navbarStyles = {
    topNav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "30px",
      padding: "18px 12px",
      background: "linear-gradient(90deg, #ff6a00, #ee0979, #1976d2)",
      color: "#fff",
      fontWeight: 700,
      boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
      position: "sticky",
      top: 0,
      zIndex: 10,
    },
    navLink: { cursor: "pointer" },
    userSection: { display: "flex", gap: "20px", alignItems: "center" },
  };

  const miniCartBtn = {
    position: "relative",
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    background: "#ff9900",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const miniCartDropdown = {
    position: "absolute",
    top: "45px",
    right: 0,
    background: "#fff",
    color: "#000",
    padding: "15px",
    width: "250px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 20,
  };

  return (
    <>
      <nav style={navbarStyles.topNav}>
        <div style={{ display: "flex", gap: "30px", flex: 1 }}>
          <span style={navbarStyles.navLink} onClick={() => setPage("home")}>
            Home
          </span>

          {/* Cart icon - always navigate to CartPage */}
          <span
            style={navbarStyles.navLink}
            onClick={() => setPage("cart")}
          >
            <FaShoppingCart /> Cart
          </span>

          {user && (
            <span
              style={navbarStyles.navLink}
              onClick={() => setPage("orders")}
            >
              Orders
            </span>
          )}
        </div>

        {user && (
          <div style={navbarStyles.userSection}>
            <span>Hello, {user.name}</span>
            <span
              style={navbarStyles.navLink}
              onClick={() => {
                localStorage.removeItem("user");
                setPage("login");
              }}
            >
              Logout
            </span>

            {/* Mini-cart button dropdown */}
            <div style={{ position: "relative" }}>
              <button
                style={miniCartBtn}
                onClick={() => setOpen(!open)}
              >
                🛒 {cart.length}
              </button>
              {open && (
                <div style={miniCartDropdown}>
                  {cart.length === 0 ? (
                    <p style={{ textAlign: "center", margin: 0 }}>Cart is empty</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 8,
                          }}
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                      <hr />
                      <p
                        style={{
                          textAlign: "right",
                          fontWeight: "bold",
                          margin: 0,
                        }}
                      >
                        Total: ₹{totalPrice()}
                      </p>

                      {/* Go to Cart button inside dropdown */}
                      <button
                        style={{
                          marginTop: "10px",
                          width: "100%",
                          padding: "8px",
                          background: "#1976d2",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setPage("cart"); // show CartPage
                          setOpen(false); // close dropdown
                        }}
                      >
                        Go to Cart
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default MiniCart;
