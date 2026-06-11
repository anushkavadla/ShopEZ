import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ShopEZ
        </Link>

        <div className="ms-auto">
          <Link
            className="btn btn-outline-light me-2"
            to="/"
          >
            Home
          </Link>

          <Link
            className="btn btn-outline-light me-2"
            to="/cart"
          >
            Cart
          </Link>

          {userInfo ? (
            <button
              className="btn btn-danger"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                className="btn btn-success me-2"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="btn btn-primary"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;