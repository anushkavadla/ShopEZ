import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [products, setProducts] =
    useState([]);

  const [totalOrders, setTotalOrders] =
    useState(0);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [image, setImage] =
    useState("");

  const [editProductId, setEditProductId] =
    useState(null);

  useEffect(() => {
    fetchProducts();

    const orders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    setTotalOrders(
      orders.length
    );
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } =
        await axios.get(
          "http://localhost:5000/api/products"
        );

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (
    e
  ) => {
    e.preventDefault();

    try {
      const userInfo =
        JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

      if (editProductId) {
        await axios.put(
          `http://localhost:5000/api/products/${editProductId}`,
          {
            name,
            description,
            price,
            category,
            stock,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        alert(
          "Product Updated Successfully"
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          {
            name,
            description,
            price,
            category,
            stock,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        alert(
          "Product Added Successfully"
        );
      }

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setStock("");
      setImage("");

      setEditProductId(null);

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const editProductHandler = (
    product
  ) => {
    setEditProductId(
      product._id
    );

    setName(product.name);
    setDescription(
      product.description
    );
    setPrice(product.price);
    setCategory(
      product.category
    );
    setStock(product.stock);
    setImage(
      product.image || ""
    );
  };

  const deleteProductHandler =
    async (productId) => {
      try {
        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        await axios.delete(
          `http://localhost:5000/api/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        alert(
          "Product Deleted Successfully"
        );

        fetchProducts();
      } catch (error) {
        console.log(error);

        alert(
          "Delete Failed"
        );
      }
    };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">
        Admin Dashboard
      </h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h4>
              📦 Total Products:{" "}
              {products.length}
            </h4>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow p-3">
            <h4>
              📋 Total Orders:{" "}
              {totalOrders}
            </h4>
          </div>
        </div>
      </div>

      <div className="card shadow p-4 mb-4">
        <h3>
          {editProductId
            ? "Update Product"
            : "Add New Product"}
        </h3>

        <form
          onSubmit={
            submitHandler
          }
        >
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
          />

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(
                e.target.value
              )
            }
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Image File Name (example: iphone17pro.jpg)"
            value={image}
            onChange={(e) =>
              setImage(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="btn btn-success"
          >
            {editProductId
              ? "Update Product"
              : "Add Product"}
          </button>
        </form>
      </div>

      {products.map(
        (product) => (
          <div
            key={product._id}
            className="card shadow mb-3"
          >
            <div className="card-body">
              <h4>
                {product.name}
              </h4>

              <p>
                {
                  product.description
                }
              </p>

              <h5 className="text-success">
                ₹
                {product.price}
              </h5>

              <p>
                Category:{" "}
                {
                  product.category
                }
              </p>

              <p>
                Stock:{" "}
                {product.stock}
              </p>

              <p>
                Image:{" "}
                {product.image}
              </p>

              <button
                className="btn btn-warning me-2"
                onClick={() =>
                  editProductHandler(
                    product
                  )
                }
              >
                Edit Product
              </button>

              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteProductHandler(
                    product._id
                  )
                }
              >
                Delete Product
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default AdminDashboard;