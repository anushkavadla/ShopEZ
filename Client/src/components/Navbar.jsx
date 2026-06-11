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
    <nav>
      <h2>ShopEZ</h2>

      <Link to="/">Home</Link>

      {" | "}

      <Link to="/cart">Cart</Link>

      {" | "}

      {userInfo ? (
        <button onClick={logoutHandler}>
          Logout
        </button>
      ) : (
        <>
          <Link to="/login">Login</Link>

          {" | "}

          <Link to="/register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;