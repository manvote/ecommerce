import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaShoppingCart, FaChevronLeft, FaChevronRight, FaHome } from "react-icons/fa";

// 🎨 Import banners
import banner1 from "../assets/banners/banner1.png";
import banner2 from "../assets/banners/banner2.png";
import banner3 from "../assets/banners/banner3.png";

// 🎨 Import products
import headphone from "../assets/products/electronics/headphone.jpg";
import smartwatch from "../assets/products/electronics/smartwatch.jpg";
import bluetoothspeaker from "../assets/products/electronics/bluetoothspeaker.jpg";
import gamingmouse from "../assets/products/electronics/gamingmouse.jpg";
import wirelesskeyboard from "../assets/products/electronics/wirelesskeyboard.jpg";
import powerbank from "../assets/products/electronics/powerbank.jpg";

import tshirt from "../assets/products/fashion/tshirt.jpg";
import jeans from "../assets/products/fashion/jeans.jpg";
import jacket from "../assets/products/fashion/jacket.jpg";
import sneakers from "../assets/products/fashion/sneakers.jpg";
import formalshirt from "../assets/products/fashion/formalshirt.jpg";
import sunglasses from "../assets/products/fashion/sunglasses.jpg";

import lipstick from "../assets/products/beauty/lipstick.jpg";
import foundation from "../assets/products/beauty/foundation.jpg";
import eyeliner from "../assets/products/beauty/eyeliner.jpg";
import perfume from "../assets/products/beauty/perfume.jpg";
import facecream from "../assets/products/beauty/facecream.jpg";
import nailpolish from "../assets/products/beauty/nailpolish.jpg";

import mixer from "../assets/products/appliances/mixer.jpg";
import airfryer from "../assets/products/appliances/airfryer.jpg";
import microwaveoven from "../assets/products/appliances/microwaveoven.jpg";
import electrickettle from "../assets/products/appliances/electrickettle.jpg";
import induction from "../assets/products/appliances/induction.jpg";
import ironbox from "../assets/products/appliances/ironbox.jpg";

import sofa from "../assets/products/furniture/sofa.jpg";
import diningtable from "../assets/products/furniture/diningtable.jpg";
import officechair from "../assets/products/furniture/officechair.jpg";
import bedframe from "../assets/products/furniture/bedframe.jpg";
import bookshelf from "../assets/products/furniture/bookshelf.jpg";
import coffeetable from "../assets/products/furniture/coffeetable.jpg";

import cartoy from "../assets/products/toys/cartoy.jpg";
import teddybear from "../assets/products/toys/teddybear.jpg";
import buildingblocks from "../assets/products/toys/buildingblocks.jpg";
import drone from "../assets/products/toys/drone.jpg";
import dollset from "../assets/products/toys/dollset.jpg";
import puzzle from "../assets/products/toys/puzzle.jpg";

const Home = () => {
  const navigate = useNavigate();
  const categories = ["Electronics", "Fashion", "Beauty", "Appliances", "Furniture", "Toys"];

  const products = [
    // Electronics
    { id: 1, name: "Wireless Headphones", price: 1999, category: "Electronics", image: headphone },
    { id: 2, name: "Smart Watch", price: 2499, category: "Electronics", image: smartwatch },
    { id: 3, name: "Bluetooth Speaker", price: 1499, category: "Electronics", image: bluetoothspeaker },
    { id: 4, name: "Gaming Mouse", price: 999, category: "Electronics", image: gamingmouse },
    { id: 5, name: "Wireless Keyboard", price: 1299, category: "Electronics", image: wirelesskeyboard },
    { id: 6, name: "Power Bank 10000mAh", price: 1799, category: "Electronics", image: powerbank },
    // Fashion
    { id: 7, name: "T-shirt", price: 499, category: "Fashion", image: tshirt },
    { id: 8, name: "Jeans", price: 999, category: "Fashion", image: jeans },
    { id: 9, name: "Jacket", price: 1499, category: "Fashion", image: jacket },
    { id: 10, name: "Sneakers", price: 1999, category: "Fashion", image: sneakers },
    { id: 11, name: "Formal Shirt", price: 899, category: "Fashion", image: formalshirt },
    { id: 12, name: "Sunglasses", price: 699, category: "Fashion", image: sunglasses },
    // Beauty
    { id: 13, name: "Lipstick", price: 299, category: "Beauty", image: lipstick },
    { id: 14, name: "Foundation", price: 499, category: "Beauty", image: foundation },
    { id: 15, name: "Eyeliner", price: 199, category: "Beauty", image: eyeliner },
    { id: 16, name: "Perfume", price: 899, category: "Beauty", image: perfume },
    { id: 17, name: "Face Cream", price: 399, category: "Beauty", image: facecream },
    { id: 18, name: "Nail Polish", price: 149, category: "Beauty", image: nailpolish },
    // Appliances
    { id: 19, name: "Mixer Grinder", price: 3499, category: "Appliances", image: mixer },
    { id: 20, name: "Air Fryer", price: 5999, category: "Appliances", image: airfryer },
    { id: 21, name: "Microwave Oven", price: 8999, category: "Appliances", image: microwaveoven },
    { id: 22, name: "Electric Kettle", price: 1499, category: "Appliances", image: electrickettle },
    { id: 23, name: "Induction Cooktop", price: 3499, category: "Appliances", image: induction },
    { id: 24, name: "Iron Box", price: 1299, category: "Appliances", image: ironbox },
    // Furniture
    { id: 25, name: "Sofa", price: 15999, category: "Furniture", image: sofa },
    { id: 26, name: "Dining Table", price: 11999, category: "Furniture", image: diningtable },
    { id: 27, name: "Office Chair", price: 4999, category: "Furniture", image: officechair },
    { id: 28, name: "Bed Frame", price: 15999, category: "Furniture", image: bedframe },
    { id: 29, name: "Bookshelf", price: 2999, category: "Furniture", image: bookshelf },
    { id: 30, name: "Coffee Table", price: 3499, category: "Furniture", image: coffeetable },
    // Toys
    { id: 31, name: "Remote Car Toy", price: 899, category: "Toys", image: cartoy },
    { id: 32, name: "Teddy Bear", price: 499, category: "Toys", image: teddybear },
    { id: 33, name: "Building Blocks", price: 699, category: "Toys", image: buildingblocks },
    { id: 34, name: "Drone Toy", price: 2999, category: "Toys", image: drone },
    { id: 35, name: "Doll Set", price: 899, category: "Toys", image: dollset },
    { id: 36, name: "Puzzle Game", price: 499, category: "Toys", image: puzzle },
  ];

  const offers = [banner1, banner2, banner3];
  const [currentBanner, setCurrentBanner] = useState(0);
  const scrollRefs = useRef({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [offers.length]);

  const handleAddToCart = (product) => alert(`${product.name} added to cart 🛒`);


  const scroll = (category, direction) => {
    const container = scrollRefs.current[category];
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const styles = {
    container: { fontFamily: "Poppins, sans-serif",
       background: "#f0f4f8", 
       padding: "20px", 
       paddingTop: "90px", 
       overflowX: "hidden" },
    navbar: {  display: "flex", 
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
              zIndex: 1000,   },
    logo: { fontWeight: "bold", 
           fontSize: "20px" },
    searchWrapper: { display: "flex", 
                   flex: "1 1 300px", 
                   minWidth: "200px", 
                   maxWidth: "500px", 
                   alignItems: "center", 
                   gap: "10px" },
    searchInput: { flex: 1, 
                  padding: "10px", 
                  borderRadius: "6px", 
                  border: "none", 
                  minWidth: "100px" },
    searchButton: { padding: "10px 12px", borderRadius: "4px", border: "none", background: "#ff9900", color: "#fff", fontWeight: "bold", cursor: "pointer" },
    userCart: { display: "flex", gap: "50px", alignItems: "center", fontWeight: "bold", flexWrap: "wrap" },
    slider: { width: "100%", overflow: "hidden", position: "relative", borderRadius: "8px", marginBottom: "30px" },
    slideImage: { width: "100%", height: "auto", maxHeight: "400px", objectFit: "cover", borderRadius: "8px", transition: "opacity 1s ease-in-out" },
    categorySection: { marginBottom: "40px", position: "relative" },
    categoryTitle: { fontSize: "24px", marginBottom: "15px", color: "#1976d2" },
    productList: { display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "flex-start", overflowX: "visible", scrollBehavior: "auto" },
    productCard: {
  display: "flex",
  flexDirection: "column",   // stack elements vertically
  justifyContent: "space-between", // pushes Add to Cart to bottom
  flex: "1 1 180px",
  minWidth: "150px",
  maxWidth: "220px",
  border: "1px solid #ddd",
  borderRadius: "14px",
  padding: "10px",
  background: "#fff",
  textAlign: "center",
  boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
  transition: "transform 0.2s ease-in-out",
},

productImage: {
  width: "100%",
  height: "150px",      // keep consistent height
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "10px", // optional spacing before text
},

addToCart: {
  background: "linear-gradient(90deg, #ff6a00, #ff2a5a)",
  border: "none",
  padding: "8px 12px",
  color: "white",
  fontWeight: "bold",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "auto",    // pushes the button to the bottom
},
  arrowButton: { position: "absolute", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.95)", border: "none", cursor: "pointer", fontSize: "20px", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.2)", zIndex: 10 },
    leftArrow: { left: "5px" },
    rightArrow: { right: "5px" },
  };

  return (
    <div style={styles.container}>
      {/* ===== Navbar ===== */}
      <div style={styles.navbar}>
        <div style={styles.logo}>MyShop</div>
        <div style={styles.searchWrapper}>
          <input type="text" placeholder="Search products..." style={styles.searchInput} />
          <button style={styles.searchButton}>Search</button>
        </div>
        <div style={styles.userCart}>
          <span><FaUserAlt /> Account</span>
          <span><FaShoppingCart /> Cart</span>
          <span onClick={() => navigate("/home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
            <FaHome /> Home
          </span>
        </div>
      </div>

      {/* Banner */}
      <div style={styles.slider}>
        {offers.map((offer, index) => (
          <img
            key={index}
            src={offer}
            alt={'Offer ${index}'}
            style={{
              ...styles.slideImage,
              opacity: index === currentBanner ? 1 : 0,
              position: index === currentBanner ? "relative" : "absolute",
            }}
          />
        ))
        }
      </div>

      {/* Categories */}
      {categories.map((cat) => (
        <div key={cat} style={styles.categorySection}>
          <h2 style={styles.categoryTitle}>{cat}</h2>

          <button style={{ ...styles.arrowButton, ...styles.leftArrow }} onClick={() => scroll(cat, "left")}>
            <FaChevronLeft />
          </button>

          <div ref={(el) => (scrollRefs.current[cat] = el)} style={styles.productList}>
            {products.filter((p) => p.category === cat).map((product) => (
              <div key={product.id} style={styles.productCard} onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")} onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                <img src={product.image} alt={product.name} style={styles.productImage} />
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                <button style={styles.addToCart} onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          <button style={{ ...styles.arrowButton, ...styles.rightArrow }} onClick={() => scroll(cat, "right")}>
            <FaChevronRight />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;