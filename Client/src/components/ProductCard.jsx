import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        margin: "10px",
        borderRadius: "10px",
      }}
    >
      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <h3>₹{product.price}</h3>

      <p>Category: {product.category}</p>

      <p>Stock: {product.stock}</p>

      <Link to={`/product/${product._id}`}>
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;