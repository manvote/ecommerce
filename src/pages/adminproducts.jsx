import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Products = ({ products, setProducts }) => {
  const [form, setForm] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("adminproducts") || "[]");
    if (storedProducts) setProducts(storedProducts);
  }, [setProducts]);

  useEffect(() => {
    localStorage.setItem("adminproducts", JSON.stringify(products));
  }, [products]);

  useEffect(() => setEditing(!!form.id), [form]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm((prev) => ({ ...prev, image: event.target.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: name === "name" ? value.toUpperCase() : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;

    if (editing) {
      setProducts(products.map((p) => (p.id === form.id ? { ...form } : p)));
    } else {
      setProducts([...products, { ...form, id: Date.now() }]);
    }

    setForm({ id: null, name: "", category: "", price: "", description: "", image: "" });
  };

  const handleEdit = (p) => setForm(p);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="admin-dashboard">
      <style>{`
        :root {
          --gradient-nav: linear-gradient(90deg, #ff6a00, #ee0979, #2196f3);
          --bg: #f0f4f8;
          --card-bg: #ffffff;
        }

        * { box-sizing: border-box; }
        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: "Poppins", sans-serif;
          background: var(--bg);
        }

        .admin-dashboard {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
        }

        /* Navigation Bar */
        .top-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--gradient-nav);
          padding: 16px 0;
        }
        .top-nav a {
          color: #fff;
          font-weight: 600;
          margin: 0 30px;
          text-decoration: none;
          font-size: 18px;
        }
        .top-nav a:hover { opacity: 0.8; }

        /* Main content */
        .content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }

        .page-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(90deg, #ee0979, #9e2af9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 24px;
        }

        .card {
          background: var(--card-bg);
          border-radius: 14px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(15,23,42,0.08);
          margin-bottom: 30px;
        }

        /* Form */
        .product-form {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .product-form input, .product-form textarea {
          padding: 10px 14px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          flex: 1 1 200px;
        }
        .product-form textarea {
          resize: none;
          min-height: 50px;
        }
        .product-form button {
          background: linear-gradient(90deg, #1976d2, #42a5f5);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          padding: 10px 24px;
          cursor: pointer;
          transition: 0.3s;
        }
        .product-form button:hover {
          opacity: 0.85;
        }

        /* Table */
        .table-wrap { overflow-x: auto; }
        .product-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 850px;
        }
        .product-table thead th {
          padding: 14px;
          background: linear-gradient(90deg,#1976d2,#42a5f5);
          color: white;
          text-transform: uppercase;
          font-size: 14px;
          letter-spacing: 0.6px;
        }
        .product-table tbody td {
          padding: 12px;
          border-bottom: 1px solid #eef6ff;
          text-align: center;
          font-size: 15px;
        }
        .product-table tbody tr:nth-child(odd) td { background: #f9fbff; }
        .product-table tbody tr:nth-child(even) td { background: #f1f6ff; }
        .product-table tbody tr:hover td { background: #e3f2fd; }

        .action-btn {
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          cursor: pointer;
          font-size: 14px;
          color: white;
        }
        .edit-btn { background-color: #1e88e5; }
        .delete-btn { background-color: #e53935; }

        img.preview {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
        }
      `}</style>

      {/* Navbar */}
      <div className="top-nav">
        <Link to="/adminproducts">Products</Link>
        <Link to="/adminorders">Orders</Link>
        
      </div>

      {/* Content */}
      <div className="content">
        <h1 className="page-title">Product Management</h1>

        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="product-form">
            <input name="name" value={form.name} placeholder="Product Name" onChange={handleChange} />
            <input name="category" value={form.category} placeholder="Category" onChange={handleChange} />
            <input name="price" type="number" value={form.price} placeholder="Price" onChange={handleChange} />
            <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} />
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
            <button type="submit">{editing ? "Update" : "Add"} Product</button>
          </form>
        </div>

        {/* Table */}
        <div className="card table-wrap">
          <table className="product-table">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", color: "#777" }}>
                    No products added yet.
                  </td>
                </tr>
              ) : (
                products.map((p, i) => (
                  <tr key={p.id}>
                    <td>{i + 1}</td>
                    <td>{p.image ? <img src={p.image} alt={p.name} className="preview" /> : "—"}</td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>${p.price}</td>
                    <td>{p.description}</td>
                    <td>
                      <button className="action-btn edit-btn" onClick={() => handleEdit(p)}>
                        Edit
                      </button>{" "}
                      <button className="action-btn delete-btn" onClick={() => handleDelete(p.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;