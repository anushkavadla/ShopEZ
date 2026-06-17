import { useEffect, useState } from "react";
import axios from "axios";
function Cart() {
  const [cartItems, setCartItems] =
    useState([]);

  useEffect(() => {
    const items =
      JSON.parse(
        localStorage.getItem(
          "cartItems"
        )
      ) || [];

    setCartItems(items);
  }, []);

  const removeFromCartHandler = (
    indexToRemove
  ) => {
    const updatedCart =
      cartItems.filter(
        (_, index) =>
          index !== indexToRemove
      );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    );
  };

  const checkoutHandler = async () => {
  try {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    const orderData = {
      userId: userInfo.user._id,

      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity || 1,
      })),

      totalAmount: totalPrice,
    };

    await axios.post(
      "http://localhost:5000/api/orders",
      orderData
    );

    alert("Order Placed Successfully!");

    localStorage.removeItem("cartItems");

    setCartItems([]);
  } catch (error) {
    console.log(error);
    alert("Failed To Place Order");
  }
};

  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price *
          (item.quantity || 1),
      0
    );

  return (
    <div className="container mt-4">

      <h1 className="mb-4">
        🛒 Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Cart is Empty
        </div>
      ) : (
        <>
          {cartItems.map(
            (item, index) => (
              <div
                key={index}
                className="card mb-3 shadow"
              >
                <div className="card-body">

                  <div className="row align-items-center">

                    <div className="col-md-3 text-center">

                      <img
                        src={`/images/${item.image}`}
                        alt={item.name}
                        className="img-fluid"
                        style={{
                          maxHeight:
                            "150px",
                          objectFit:
                            "contain",
                        }}
                      />

                    </div>

                    <div className="col-md-9">

                      <h4>
                        {item.name}
                      </h4>

                      <p>
                        {
                          item.description
                        }
                      </p>

                      <h5 className="text-success">
                        ₹{item.price}
                      </h5>

                      <p>
                        <strong>
                          Quantity:
                        </strong>{" "}
                        {item.quantity ||
                          1}
                      </p>

                      <p>
                        <strong>
                          Subtotal:
                        </strong>{" "}
                        ₹
                        {(
                          item.price *
                          (item.quantity ||
                            1)
                        ).toLocaleString()}
                      </p>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          removeFromCartHandler(
                            index
                          )
                        }
                      >
                        Remove From Cart
                      </button>

                    </div>

                  </div>

                </div>
              </div>
            )
          )}

          <div className="card shadow mt-4">
            <div className="card-body">

              <h3>
                Total: ₹
                {totalPrice.toLocaleString()}
              </h3>

              <button
                className="btn btn-success mt-3"
                onClick={
                  checkoutHandler
                }
              >
                Proceed To Checkout
              </button>

            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;