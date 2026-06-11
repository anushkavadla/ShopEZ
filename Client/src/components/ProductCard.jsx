import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow">
        <div className="card-body">
          <h4>{product.name}</h4>

          <p>{product.description}</p>

          <h5 className="text-success">
            ₹{product.price}
          </h5>

          <p>
            Category: {product.category}
          </p>

          <p>
            Stock: {product.stock}
          </p>

          <Link
            to={`/product/${product._id}`}
            className="btn btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;