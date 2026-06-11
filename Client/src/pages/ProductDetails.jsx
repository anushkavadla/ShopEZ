import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCartHandler = () => {
    const cartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    cartItems.push(product);

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

    alert("Product Added To Cart!");
  };

  if (!product) {
    return (
      <div className="container mt-5">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h1>{product.name}</h1>

        <p className="mt-3">
          {product.description}
        </p>

        <h2 className="text-success">
          ₹{product.price}
        </h2>

        <p>
          <strong>Category:</strong>{" "}
          {product.category}
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {product.stock}
        </p>

        <button
          className="btn btn-primary mt-3"
          onClick={addToCartHandler}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;