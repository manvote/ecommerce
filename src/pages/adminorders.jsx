import React, { useEffect, useState } from "react";

const Orders = ({ orders, setOrders }) => {
  const [filterValues, setFilterValues] = useState({
    productName: "",
    price: "",
    quantity: "",
    total: "",
    status: "",
    deliveryInfo: "",
    placed: "",
  });

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("adminorders") || "[]");
    if (storedOrders) setOrders(storedOrders);
  }, [setOrders]);

  useEffect(() => {
    localStorage.setItem("adminorders", JSON.stringify(orders));
  }, [orders]);

  const handleFilterChange = (e, column) => {
    setFilterValues({ ...filterValues, [column]: e.target.value });
  };

  const filteredOrders = orders.filter((o) => {
    return (
      o.productName.toLowerCase().includes(filterValues.productName.toLowerCase()) &&
      String(o.price).includes(filterValues.price) &&
      String(o.quantity).includes(filterValues.quantity) &&
      String(o.total).includes(filterValues.total) &&
      o.status.toLowerCase().includes(filterValues.status.toLowerCase()) &&
      (o.status === "Delivered"
        ? "delivered".includes(filterValues.deliveryInfo.toLowerCase())
        : "still pending".includes(filterValues.deliveryInfo.toLowerCase())) &&
      new Date(o.createdAt).toLocaleString().includes(filterValues.placed)
    );
  });

  return (
    <div className="page-wrap">
      <style>{`
        :root {
          --gradient-nav: linear-gradient(90deg, #ff6a00, #ee0979, #2196f3);
          --bg: #f5f7fa;
          --card-bg: #ffffff;
        }

        * {
          box-sizing: border-box;
        }

        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          font-family: "Poppins", sans-serif;
          background: var(--bg);
        }

        .page-wrap {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          padding: 0;
          overflow: hidden;
        }

        /* Navigation */
        .top-nav {
          display: flex;
          justify-content: center;
          background: var(--gradient-nav);
          padding: 16px 0;
        }

        .top-nav a {
          color: #fff;
          font-weight: 600;
          margin: 0 24px;
          text-decoration: none;
          font-size: 18px;
        }

        .top-nav a:hover {
          opacity: 0.8;
        }

        /* Page title */
        .page-title {
          text-align: center;
          font-size: 2.8rem;
          font-weight: 700;
          background: linear-gradient(90deg, #ee0979, #9e2af9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 20px 0;
        }

        /* Content area */
        .content {
          flex: 1;
          overflow-y: auto;
          padding: 0 30px 30px 30px;
        }

        /* Card */
        .card {
          background: var(--card-bg);
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 32px;
          box-shadow: 0 8px 30px rgba(15,23,42,0.06);
          height: auto;
        }

        /* Table */
        .table-wrap {
          overflow-x: auto;
          max-height: 70vh;
          overflow-y: auto;
        }

        .product-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
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

        /* Filter inputs */
        .filter-input {
          width: 100%;
          padding: 6px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 12px;
        }

        /* Empty message */
        .no-data {
          text-align: center;
          padding: 16px;
          color: #777;
          font-style: italic;
        }
      `}</style>

      {/* Navigation */}
      <div className="top-nav">
        <a href="/adminproducts">Products</a>
        <a href="/adminorders">Orders</a>
      </div>

      <div className="content">
        {/* Title */}
        <h1 className="page-title">All Orders ({orders.length})</h1>

        <div className="card table-wrap">
          <table className="product-table">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
                <th>Delivery Info</th>
                <th>Placed</th>
              </tr>
              {/* Filter row */}
              <tr>
                <th></th>
                <th>
                  <input
                    className="filter-input"
                    placeholder="Filter"
                    value={filterValues.productName}
                    onChange={(e) => handleFilterChange(e, "productName")}
                  />
                </th>
                <th>
                  <input
                    className="filter-input"
                    placeholder="Filter"
                    value={filterValues.price}
                    onChange={(e) => handleFilterChange(e, "price")}
                  />
                </th>
                <th>
                  <input
                    className="filter-input"
                    placeholder="Filter"
                    value={filterValues.quantity}
                    onChange={(e) => handleFilterChange(e, "quantity")}
                  />
                </th>
                <th>
                  <input
                    className="filter-input"
                    placeholder="Filter"
                    value={filterValues.total}
                    onChange={(e) => handleFilterChange(e, "total")}
                  />
                </th>
                <th>
                  <input
                    className="filter-input"
                    placeholder="Filter"
                    value={filterValues.status}
                    onChange={(e) => handleFilterChange(e, "status")}
                  />
                </th>
                <th>
                  <input
                    className="filter-input"
                    placeholder="Filter"
                    value={filterValues.deliveryInfo}
                    onChange={(e) => handleFilterChange(e, "deliveryInfo")}
                  />
                </th>
                <th>
                  <input
                    className="filter-input"
                    placeholder="Filter"
                    value={filterValues.placed}
                    onChange={(e) => handleFilterChange(e, "placed")}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{o.productName}</td>
                    <td>${o.price}</td>
                    <td>{o.quantity}</td>
                    <td>${o.total}</td>
                    <td>{o.status}</td>
                    <td>{o.status === "Delivered" ? "Delivered" : "Still Pending"}</td>
                    <td>{new Date(o.createdAt).toLocaleString()}</td>
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

export default Orders;