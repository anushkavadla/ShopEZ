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

  return (
    <div>
      <h1>Cart Page</h1>

      {cartItems.length === 0 ? (
        <h3>Cart is Empty</h3>
      ) : (
        cartItems.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px",
              borderRadius: "10px",
            }}
          >
            <h2>{item.name}</h2>

            <p>{item.description}</p>

            <h3>₹{item.price}</h3>

            <button
              onClick={() =>
                removeFromCartHandler(index)
              }
            >
              Remove From Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;