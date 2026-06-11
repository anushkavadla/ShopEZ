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
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <h2>₹{product.price}</h2>

      <p>Category: {product.category}</p>

      <p>Stock: {product.stock}</p>

      <button onClick={addToCartHandler}>
        Add To Cart
      </button>
    </div>
  );
}

export default ProductDetails;