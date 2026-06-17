import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [quantity, setQuantity] =
    useState(1);

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
      JSON.parse(
        localStorage.getItem(
          "cartItems"
        )
      ) || [];

    cartItems.push({
      ...product,
      quantity,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

    alert(
      "Product Added To Cart!"
    );
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

      <div className="card shadow border-0 p-4">

        <div className="row">

          <div className="col-md-6 text-center">

            <img
              src={`/images/${product.image}`}
              alt={product.name}
              className="img-fluid rounded"
              style={{
                maxHeight: "450px",
                objectFit: "contain",
              }}
            />

          </div>

          <div className="col-md-6">

            <h1 className="fw-bold">
              {product.name}
            </h1>

            <h2 className="text-success mt-3">
              ₹{product.price}
            </h2>

            <div className="mt-2 mb-3">
              ⭐⭐⭐⭐⭐
              <span className="text-muted ms-2">
                (4.8 Rating)
              </span>
            </div>

            <p className="mt-3">
              {product.description}
            </p>

            <hr />

            <p>
              <strong>
                Category:
              </strong>{" "}
              {product.category}
            </p>

            <p>
              <strong>
                Stock:
              </strong>{" "}
              {product.stock}

              {product.stock === 0 && (
                <span className="text-danger ms-2">
                  (Out of Stock)
                </span>
              )}
            </p>

            <div className="d-flex align-items-center gap-3 mt-3">

              <button
                className="btn btn-outline-dark"
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(
                    quantity - 1
                  )
                }
              >
                -
              </button>

              <h5 className="m-0">
                {quantity}
              </h5>

              <button
                className="btn btn-outline-dark"
                onClick={() =>
                  quantity <
                    product.stock &&
                  setQuantity(
                    quantity + 1
                  )
                }
              >
                +
              </button>

            </div>

            <p className="mt-3">
              <strong>
                Delivery:
              </strong>{" "}
              Free Delivery Available
            </p>

            <div className="d-flex gap-3 mt-4">

              <button
                className="btn btn-warning btn-lg"
                onClick={
                  addToCartHandler
                }
                disabled={
                  product.stock === 0
                }
              >
                🛒 Add To Cart
              </button>

              <button
                className="btn btn-success btn-lg"
                disabled={
                  product.stock === 0
                }
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;