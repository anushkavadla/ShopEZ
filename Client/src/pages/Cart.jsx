import { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items =
      JSON.parse(
        localStorage.getItem("cartItems")
      ) || [];

    setCartItems(items);
  }, []);

  const removeFromCartHandler = (indexToRemove) => {
    const updatedCart = cartItems.filter(
      (_, index) => index !== indexToRemove
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    );
  };

  const checkoutHandler = () => {
    alert("Order Placed Successfully!");

    localStorage.removeItem("cartItems");

    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Cart is Empty
        </div>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="card mb-3 shadow"
            >
              <div className="card-body">
                <h4>{item.name}</h4>

                <p>{item.description}</p>

                <h5 className="text-success">
                  ₹{item.price}
                </h5>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    removeFromCartHandler(index)
                  }
                >
                  Remove From Cart
                </button>
              </div>
            </div>
          ))}

          <div className="card shadow mt-4">
            <div className="card-body">
              <h3>
                Total: ₹
                {totalPrice.toLocaleString()}
              </h3>

              <button
                className="btn btn-success mt-3"
                onClick={checkoutHandler}
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