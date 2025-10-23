import React, { useState, useEffect } from "react";

const Products = ({ products, setProducts }) => {
  const [form, setForm] = useState({ id: null, name: "", price: "" });
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
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "name" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;

    if (editing) {
      setProducts(
        products.map((p) =>
          p.id === form.id ? { ...p, name: form.name, price: Number(form.price) } : p
        )
      );
    } else {
      setProducts([
        ...products,
        { id: Date.now(), name: form.name, price: Number(form.price) },
      ]);
    }
    setForm({ id: null, name: "", price: "" });
  };

  const handleEdit = (p) => setForm(p);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="page-wrap">
      <style>{`
        :root {
          --gradient-nav: linear-gradient(90deg, #ff6a00, #ee0979, #2196f3);
          --bg: #f5f7fa;
          --card-bg: #ffffff;
        }

        * { box-sizing: border-box; }
        html, body, #root {
          margin: 0;
          padding: 0;
          font-family: "Poppins", sans-serif;
          background: var(--bg);
        }

        .page-wrap { max-width: 1100px; margin: 0 auto; padding: 32px 20px; }

        /* Navigation */
        .top-nav {
          display: flex;
          justify-content: center;
          background: var(--gradient-nav);
          padding: 12px 0;
          margin-bottom: 40px;
        }
        .top-nav a {
          color: #fff;
          font-weight: 600;
          margin: 0 24px;
          text-decoration: none;
          font-size: 16px;
        }
        .top-nav a:hover { opacity: 0.8; }

        /* Title */
        .page-title {
          text-align: center;
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(90deg, #ee0979, #9e2af9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 32px;
        }

        /* Card */
        .card {
          background: var(--card-bg);
          border-radius: 14px;
          padding: 24px;
          box-shadow: 0 8px 30px rgba(15,23,42,0.06);
        }

        /* Form */
        .product-form {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 24px;
        }
        .product-form input {
          padding: 10px 14px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          flex: 1 1 200px;
        }
        .product-form button {
          background: linear-gradient(90deg, #1976d2, #42a5f5);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
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
          min-width: 720px;
        }
        .product-table thead th {
          padding: 12px;
          background: linear-gradient(90deg,#1976d2,#42a5f5);
          color: white;
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 0.6px;
        }
        .product-table tbody td {
          padding: 12px;
          border-bottom: 1px solid #eef6ff;
          text-align: center;
          font-size: 14px;
        }
        .product-table tbody tr:nth-child(odd) td { background: #f7fbff; }
        .product-table tbody tr:nth-child(even) td { background: #eef6ff; }
        .product-table tbody tr:hover td { background: #e3f2fd; }

        .action-btn {
          border: none;
          border-radius: 6px;
          padding: 6px 10px;
          cursor: pointer;
          font-size: 13px;
          color: white;
        }
        .edit-btn { background-color: #1e88e5; }
        .delete-btn { background-color: #e53935; }
      `}</style>

      {/* Navigation */}
      <div className="top-nav">
        <a href="/adminproducts">Products</a>
        <a href="/adminorders">Orders</a>
      </div>

      {/* Page Title */}
      <h1 className="page-title">Products</h1>

      {/* Product Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="product-form">
          <input
            name="name"
            value={form.name}
            placeholder="Product Name"
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            value={form.price}
            placeholder="Price"
            onChange={handleChange}
          />
          <button type="submit">{editing ? "Update" : "Add"} Product</button>
        </form>

        {/* Product Table */}
        <div className="table-wrap">
          <table className="product-table">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Product</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", color: "#777" }}>
                    No products added yet.
                  </td>
                </tr>
              ) : (
                products.map((p, i) => (
                  <tr key={p.id}>
                    <td>{i + 1}</td>
                    <td>{p.name}</td>
                    <td>${p.price}</td>
                    <td>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(p.id)}
                      >
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