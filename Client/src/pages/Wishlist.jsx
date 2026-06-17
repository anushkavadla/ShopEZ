import { useEffect, useState } from "react";

function Wishlist() {
    const removeFromWishlist = (id) => {
  const updatedWishlist =
    wishlistItems.filter(
      (item) => item._id !== id
    );

  setWishlistItems(updatedWishlist);

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(updatedWishlist)
  );
};
  const [wishlistItems, setWishlistItems] =
    useState([]);

  useEffect(() => {
    const items =
      JSON.parse(
        localStorage.getItem(
          "wishlistItems"
        )
      ) || [];

    setWishlistItems(items);
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">
        ❤️ My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="alert alert-info">
          Wishlist is Empty
        </div>
      ) : (
        wishlistItems.map((item) => (
          <div
            key={item._id}
            className="card shadow mb-3"
          >
            <div className="card-body">
              <h4>{item.name}</h4>

              <p>
                {item.description}
              </p>

              <h5 className="text-success">
                ₹{item.price}
              </h5>
              <button
  className="btn btn-danger mt-2"
  onClick={() =>
    removeFromWishlist(item._id)
  }
>
  Remove
</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;