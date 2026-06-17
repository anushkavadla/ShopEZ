import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  useState,
  useEffect,
} from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const authPages = [
    "/login",
    "/register",
  ];

  if (
    authPages.includes(
      location.pathname
    )
  ) {
    return null;
  }

  const [search, setSearch] =
    useState("");

  const [cartCount, setCartCount] =
    useState(0);

  const [
    wishlistCount,
    setWishlistCount,
  ] = useState(0);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  useEffect(() => {
    const cartItems =
      JSON.parse(
        localStorage.getItem(
          "cartItems"
        )
      ) || [];

    const wishlistItems =
      JSON.parse(
        localStorage.getItem(
          "wishlistItems"
        )
      ) || [];

    setCartCount(
      cartItems.length
    );

    setWishlistCount(
      wishlistItems.length
    );
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem(
      "userInfo"
    );

    navigate("/login");
  };

  const searchHandler = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(
        `/?keyword=${search}`
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          🛒 ShopEZ
        </Link>

        {!userInfo?.user?.isAdmin && (
          <form
            className="d-flex mx-auto"
            onSubmit={
              searchHandler
            }
            style={{
              width: "350px",
            }}
          >
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <button
              className="btn btn-primary"
              type="submit"
            >
              Search
            </button>
          </form>
        )}

        <div>

          <Link
            className="btn btn-outline-light me-2"
            to="/"
          >
            🏠 Home
          </Link>

          {!userInfo?.user?.isAdmin && (
            <>
              <Link
                className="btn btn-outline-light me-2 position-relative"
                to="/wishlist"
              >
                ❤️ Wishlist

                {wishlistCount >
                  0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >
                    {
                      wishlistCount
                    }
                  </span>
                )}
              </Link>

              <Link
                className="btn btn-outline-light me-2 position-relative"
                to="/cart"
              >
                🛒 Cart

                {cartCount >
                  0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                className="btn btn-outline-light me-2"
                to="/orders"
              >
                📦 Orders
              </Link>
            </>
          )}

          {userInfo?.user?.isAdmin && (
            <>
              <Link
                className="btn btn-warning me-2"
                to="/admin"
              >
                ⚙️ Admin
              </Link>

              <Link
                className="btn btn-info me-2"
                to="/admin/orders"
              >
                📋 Manage Orders
              </Link>
            </>
          )}

          {userInfo ? (
            <button
              className="btn btn-danger"
              onClick={
                logoutHandler
              }
            >
              🚪 Logout
            </button>
          ) : (
            <>
              <Link
                className="btn btn-success me-2"
                to="/login"
              >
                🔑 Login
              </Link>

              <Link
                className="btn btn-primary"
                to="/register"
              >
                👤 Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;