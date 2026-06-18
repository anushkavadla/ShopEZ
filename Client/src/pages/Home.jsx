import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
function Home() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] =
  useState("");
  const [selectedCategory, setSelectedCategory] =
  useState("All");
const [selectedBrand, setSelectedBrand] =
  useState("All");
  const productSectionRef = useRef(null);
  const location = useLocation();
  const keyword =
    new URLSearchParams(
      location.search
    ).get("keyword") || "";
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };  
  const filteredProducts = products.filter(
  (product) => {
    const categoryMatch =
      selectedCategory === "All" ||
      product.category.toLowerCase() ===
        selectedCategory.toLowerCase();

    const brandMatch =
  selectedBrand === "All" ||
  product.name
    .toLowerCase()
    .includes(
      selectedBrand.toLowerCase()
    ) ||
  product.description
    .toLowerCase()
    .includes(
      selectedBrand.toLowerCase()
    );

    const searchMatch =
      product.name
        .toLowerCase()
        .includes(
          keyword.toLowerCase()
        ) ||
      product.description
        .toLowerCase()
        .includes(
          keyword.toLowerCase()
        );

    return (
      categoryMatch &&
      brandMatch &&
      searchMatch
    );
  }
);

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* HERO SECTION */}
      <div
  className="text-white py-5"
  style={{
    minHeight: "500px",
    display: "flex",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#0f172a,#1e293b,#312e81)",
  }}
>
        <div className="container text-center">
          <h1
  className="fw-bold"
  style={{
    fontSize: "72px",
    letterSpacing: "-2px",
  }}
>
            Shop Smarter
          </h1>

          <p
            className="lead"
            style={{ fontSize: "24px" }}
          >
            Discover Mobiles, Laptops &
            Accessories
          </p>

          <button
            className="btn btn-warning btn-lg mt-3"
            onClick={scrollToProducts}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold mb-4">
          Shop By Category
        </h2>

        <div className="row text-center">
          <div className="col-md-3 mb-3">
            <div
              className="card shadow border-0 p-4"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedCategory(
                  "Mobiles"
                );
                scrollToProducts();
              }}
            >
              <h1>📱</h1>
              <h5>Mobiles</h5>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className="card shadow border-0 p-4"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedCategory(
                  "Laptops"
                );
                scrollToProducts();
              }}
            >
              <h1>💻</h1>
              <h5>Laptops</h5>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className="card shadow border-0 p-4"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedCategory(
                  "Accessories"
                );
                scrollToProducts();
              }}
            >
              <h1>🎧</h1>
              <h5>Accessories</h5>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className="card shadow border-0 p-4"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedCategory(
                  "Wearables"
                );
                scrollToProducts();
              }}
            >
              <h1>⌚</h1>
              <h5>Wearables</h5>
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <button
  className="btn btn-dark"
  onClick={() => {
    setSelectedCategory("All");
    setSelectedBrand("All");
  }}
>
  View All Products
</button>
        </div>
      </div>

{/* FEATURED BRANDS */}
<div className="container mt-5">
  <h2 className="text-center fw-bold mb-4">
    Featured Brands
  </h2>

  <div className="row text-center">

    {/* APPLE */}
    <div className="col-md-3 mb-3">
      <div
        className="card shadow border-0 p-4"
        style={{ cursor: "pointer" }}
        onClick={() => {
          setSelectedBrand("iPhone");
          scrollToProducts();
        }}
      >
        <img
          src="/images/apple.png"
          alt="Apple"
          style={{
            height: "70px",
            objectFit: "contain",
          }}
        />
        <h5 className="mt-3">Apple</h5>
      </div>
    </div>

    {/* SAMSUNG */}
    <div className="col-md-3 mb-3">
      <div
        className="card shadow border-0 p-4"
        style={{ cursor: "pointer" }}
        onClick={() => {
          setSelectedBrand("Samsung");
          scrollToProducts();
        }}
      >
        <img
          src="/images/samsung.png"
          alt="Samsung"
          style={{
            height: "70px",
            objectFit: "contain",
          }}
        />
        <h5 className="mt-3">Samsung</h5>
      </div>
    </div>

    {/* HP */}
    <div className="col-md-3 mb-3">
      <div
        className="card shadow border-0 p-4"
        style={{ cursor: "pointer" }}
        onClick={() => {
          setSelectedBrand("HP");
          scrollToProducts();
        }}
      >
        <img
          src="/images/hp.png"
          alt="HP"
          style={{
            height: "70px",
            objectFit: "contain",
          }}
        />
        <h5 className="mt-3">HP</h5>
      </div>
    </div>

    {/* TITAN */}
    <div className="col-md-3 mb-3">
      <div
        className="card shadow border-0 p-4"
        style={{ cursor: "pointer" }}
        onClick={() => {
          setSelectedBrand("Titan");
          scrollToProducts();
        }}
      >
        <img
          src="/images/titan-logo.png"
          alt="Titan"
          style={{
            height: "70px",
            objectFit: "contain",
          }}
        />
        <h5 className="mt-3">Titan</h5>
      </div>
    </div>

  </div>
</div>

      {/* OFFER BANNER */}
      <div className="container mt-5">
        <div
          className="p-5 rounded text-center shadow"
          style={{
            background:
              "linear-gradient(135deg,#f97316,#ea580c)",
            color: "white",
            cursor: "pointer",
          }}
          onClick={scrollToProducts}
        >
          <h2 className="fw-bold">
            Mega Sale 🔥
          </h2>

          <h4>
            Up To 50% OFF On Electronics
          </h4>

          <p className="mb-0 mt-2">
            Click Here To Explore Deals
          </p>
        </div>
      </div>
      {/* TODAY'S DEALS */}
<div className="container mt-5">
  <h2 className="text-center fw-bold mb-4">
    🔥 Today's Deals
  </h2>

  <div className="row">

    <div className="col-md-4 mb-4">
      <div className="card shadow border-0 h-100">
        <div className="badge bg-danger m-3">
          20% OFF
        </div>

        <img
  src="/images/iphone17pro.jpg"
  alt="iPhone"
  className="card-img-top"
  style={{
    height: "220px",
    width: "100%",
    objectFit: "contain",
  }}
/>

        <div className="card-body text-center">
          <h4>iPhone 17 Pro</h4>

          <h5 className="text-success">
            ₹134900
          </h5>

          <button
            className="btn btn-dark mt-2"
            onClick={scrollToProducts}
          >
            View Deal
          </button>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
      <div className="card shadow border-0 h-100">
        <div className="badge bg-danger m-3">
          15% OFF
        </div>

        <img
  src="/images/s24.jpg"
  alt="Samsung"
  className="card-img-top"
  style={{
    height: "220px",
    width: "100%",
    objectFit: "contain",
  }}
/>

        <div className="card-body text-center">
          <h4>Samsung S26</h4>

          <h5 className="text-success">
            ₹79999
          </h5>

          <button
            className="btn btn-dark mt-2"
            onClick={scrollToProducts}
          >
            View Deal
          </button>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
      <div className="card shadow border-0 h-100">
        <div className="badge bg-danger m-3">
          10% OFF
        </div>

        <img
          src="/images/titan.jpg"
          alt="Titan"
          className="card-img-top"
          style={{
            height: "220px",
            objectFit: "contain",
          }}
        />

        <div className="card-body text-center">
          <h4>Titan Watch</h4>

          <h5 className="text-success">
            ₹10495
          </h5>

          <button
            className="btn btn-dark mt-2"
            onClick={scrollToProducts}
          >
            View Deal
          </button>
        </div>
      </div>
    </div>

  </div>
</div>

      {/* PRODUCTS */}
      <div
        className="container mt-5"
        ref={productSectionRef}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">

  <h2 className="fw-bold m-0">
    {selectedCategory === "All"
      ? "Featured Products"
      : selectedCategory}
  </h2>

  <select
    className="form-select"
    style={{ width: "220px" }}
    value={sortOption}
    onChange={(e) =>
      setSortOption(e.target.value)
    }
  >
    <option value="">
      Sort By
    </option>

    <option value="lowToHigh">
      Price: Low → High
    </option>

    <option value="highToLow">
      Price: High → Low
    </option>

    <option value="rating">
  Rating: High → Low
</option>

  </select>

</div>
        <div className="row">
          {filteredProducts.length >
          0 ? (
            [...filteredProducts]
            .sort((a, b) => {
    if (sortOption === "lowToHigh") {
      return a.price - b.price;
    }

    if (sortOption === "highToLow") {
      return b.price - a.price;
    }

    if (sortOption === "rating") {
  return b.rating - a.rating;
}
    return 0;
  })
  .map((product) => (
    <ProductCard
      key={product._id}
      product={product}
    />
  ))
          ) : (
            <div className="text-center">
              <h4>
                No Products Found
              </h4>
            </div>
          )}
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="container mt-5 mb-5">
        <h2 className="text-center fw-bold mb-4">
          Why ShopEZ?
        </h2>

        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="card shadow border-0 p-4">
              <h1>🚚</h1>
              <h5>Fast Delivery</h5>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow border-0 p-4">
              <h1>🔒</h1>
              <h5>Secure Payments</h5>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow border-0 p-4">
              <h1>⭐</h1>
              <h5>Quality Products</h5>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        className="text-center text-white p-4"
        style={{
          background: "#0f172a",
        }}
      >
        <h4>ShopEZ</h4>

        <p>
          Smart Shopping Made Easy
        </p>
      </footer>
    </div>
  );
}

export default Home;