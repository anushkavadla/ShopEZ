import { useEffect, useState } from "react";
import axios from "axios";
function AdminOrders() {
    const updateStatus = async (
  orderId,
  newStatus
) => {
  try {
    await axios.put(
      `http://localhost:5000/api/orders/${orderId}`,
      {
        status: newStatus,
      }
    );

    fetchOrders();
  } catch (error) {
    console.log(error);
  }
};
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
  fetchOrders();
}, []);

const fetchOrders = async () => {
  try {
    const { data } =
      await axios.get(
        "http://localhost:5000/api/orders"
      );

    setOrders(data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="container mt-4">

      <h1 className="mb-4">
        📋 Manage Orders
      </h1>
      <div className="row mb-4">

  <div className="col-md-3">
    <div className="card text-center shadow p-3">
      <h3>{orders.length}</h3>
      <p>Total Orders</p>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center shadow p-3">
      <h3>
        {
          orders.filter(
            (o) => o.status === "Pending"
          ).length
        }
      </h3>
      <p>Pending</p>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center shadow p-3">
      <h3>
        {
          orders.filter(
            (o) => o.status === "Shipped"
          ).length
        }
      </h3>
      <p>Shipped</p>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center shadow p-3">
      <h3>
        {
          orders.filter(
            (o) => o.status === "Delivered"
          ).length
        }
      </h3>
      <p>Delivered</p>
    </div>
  </div>

</div>


      {orders.length === 0 ? (
        <div className="alert alert-info">
          No Orders Found
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card shadow mb-3"
          >
            <div className="card-body">

              <h4>
  Order #{order._id}
</h4>

            <hr />
        <p>
  Customer:
  {order.userId?.name}
</p>

<h5>👤 Customer Details</h5>

<p>
  <strong>Name:</strong>{" "}
  {order.userId?.name || "Unknown"}
</p>

<p>
  <strong>Email:</strong>{" "}
  {order.userId?.email || "Unknown"}
</p>

<hr />

              <div className="mb-3">

<h5>🛒 Products Ordered</h5>

{order.products?.map((item) => (
  <div
  key={item._id}
  className="d-flex align-items-center gap-3 mb-3"
>
  <img
    src={`/images/${item.productId?.image}`}
    alt={item.productId?.name}
    style={{
      width: "80px",
      height: "80px",
      objectFit: "contain",
    }}
  />

  <div>
    <p>
      <strong>Product:</strong>{" "}
      {item.productId?.name}
    </p>

    <p>
      <strong>Quantity:</strong>{" "}
      {item.quantity}
    </p>

    <p>
      <strong>Price:</strong> ₹
      {item.productId?.price?.toLocaleString()}
    </p>
  </div>
</div>
))}


  <p>
    <strong>Order Date:</strong>{" "}
    {new Date(
      order.createdAt
    ).toLocaleDateString()}
  </p>

  <strong>Status:</strong>

  <select
  className="form-select mt-2"
  value={order.status}
  onChange={(e) =>
    updateStatus(
  order._id,
  e.target.value
)
  }
>
    <option>
  Pending
</option>

    <option>
      Shipped
    </option>

    <option>
      Delivered
    </option>

  </select>
</div>
              <h5 className="text-success">
  ₹
  {order.totalAmount?.toLocaleString()}
</h5>

            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default AdminOrders;