function Orders() {
  const orders = [
    {
      id: 1,
      total: 85100,
      status: "Delivered",
    },
    {
      id: 2,
      total: 69999,
      status: "Processing",
    },
  ];

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="card mb-3 shadow"
        >
          <div className="card-body">
            <h4>Order #{order.id}</h4>

            <h5 className="text-success">
              ₹{order.total.toLocaleString()}
            </h5>

            <p>
              <strong>Status:</strong>{" "}
              {order.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;