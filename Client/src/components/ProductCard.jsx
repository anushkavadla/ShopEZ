import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const addToWishlist = () => {
  const wishlist =
    JSON.parse(
      localStorage.getItem("wishlistItems")
    ) || [];

  const exists = wishlist.find(
    (item) => item._id === product._id
  );

  if (!exists) {
    wishlist.push(product);

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlist)
    );

    alert("Added To Wishlist ❤️");
  }
};
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div
        className="card h-100 shadow border-0"
        style={{
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <img
          src={
            product.image
              ? `/images/${product.image}`
              : "/images/iphone.jpg"
          }
          alt={product.name}
          className="card-img-top"
          style={{
            height: "250px",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.src = "/images/iphone.jpg";
          }}
        />

        <div className="card-body">
          <span className="badge bg-primary mb-2">
            {product.category}
          </span>

          <h3 className="fw-bold">
            {product.name}
          </h3>

          <p className="text-muted">
            {product.description}
          </p>

          <h3 className="text-success fw-bold">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </h3>

          <div className="mb-2">
⭐⭐⭐⭐
<small className="text-muted ms-2">
  (3.9)
</small>
</div>
          <p>
            Stock Available:{" "}
            <strong>{product.stock}</strong>
          </p>

          <div className="d-flex gap-2">

  <button
    className="btn btn-outline-danger"
    style={{
      width: "60px",
    }}
    onClick={addToWishlist}
  >
    ❤️
  </button>

  <Link
    to={`/product/${product._id}`}
    className="btn btn-dark"
  >
    View Product
  </Link>

  <button
    className="btn btn-success"
    onClick={() => {

      const cartItems =
        JSON.parse(
          localStorage.getItem(
            "cartItems"
          )
        ) || [];

      cartItems.push({
        ...product,
        quantity: 1,
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
      );

      window.location.href =
        "/cart";
    }}
  >
    Buy Now
  </button>

</div>
        </div>
      </div>
    </div>
  );
}

const addToWishlist = () => {
  const wishlist =
    JSON.parse(
      localStorage.getItem("wishlistItems")
    ) || [];

  const exists = wishlist.find(
    (item) => item._id === product._id
  );

  if (!exists) {
    wishlist.push(product);

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlist)
    );

    alert("Added To Wishlist ❤️");
  }
};
export default ProductCard;