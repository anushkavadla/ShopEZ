import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import Wishlist from "./pages/Wishlist";
import AdminOrders from "./pages/AdminOrders";

function App() {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* USER ROUTES ONLY */}
        <Route
          path="/cart"
          element={
            userInfo?.user?.isAdmin
              ? <Navigate to="/admin" />
              : <Cart />
          }
        />

        <Route
          path="/wishlist"
          element={
            userInfo?.user?.isAdmin
              ? <Navigate to="/admin" />
              : <Wishlist />
          }
        />

        <Route
          path="/orders"
          element={
            userInfo?.user?.isAdmin
              ? <Navigate to="/admin" />
              : <Orders />
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;