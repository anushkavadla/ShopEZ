import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const { data } =
        await axios.get(
          "/api/orders"
        );

      const userOrders =
        data.filter(
          (order) =>
            order.userId?._id ===
            userInfo.user._id
        );

      setOrders(userOrders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">
        📦 My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          No Orders Found
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card shadow mb-4"
          >
            <div className="card-body">

              <h4>
                Order #{order._id}
              </h4>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    order.status ===
                    "Delivered"
                      ? "bg-success"
                      : order.status ===
                        "Shipped"
                      ? "bg-primary"
                      : "bg-warning text-dark"
                  }`}
                >
                  {order.status}
                </span>
              </p>

              <p>
                <strong>
                  Order Date:
                </strong>{" "}
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>

              <h5 className="text-success">
                ₹
                {order.totalAmount.toLocaleString()}
              </h5>

              <hr />

              {order.products.map(
                (item) => (
                  <div
                    key={item._id}
                    className="row align-items-center mb-3"
                  >
                    <div className="col-md-2">

                      <img
                        src={`/images/${item.productId.image}`}
                        alt={
                          item.productId.name
                        }
                        className="img-fluid"
                        style={{
                          maxHeight:
                            "80px",
                          objectFit:
                            "contain",
                        }}
                      />

                    </div>

                    <div className="col-md-10">

                      <h6>
                        {
                          item.productId
                            .name
                        }
                      </h6>

                      <p>
                        Qty:{" "}
                        {
                          item.quantity
                        }
                      </p>

                      <p>
                        ₹
                        {item.productId.price.toLocaleString()}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;