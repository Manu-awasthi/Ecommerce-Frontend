import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Auth from "./Pages/Auth";
import Products from "./Pages/Product";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSucess";
import Orders from "./Pages/Order";

/* 🔁 Layout: controls Footer visibility */
function Layout({ children }) {
  const location = useLocation();

  // Hide footer on these routes (prefix-based, safer)
  const hideFooterRoutes = ["/auth", "/checkout", "/success"];

  const hideFooter = hideFooterRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  /* =======================
     🔐 AUTH STATE
  ======================== */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  /* =======================
     🛒 CART STATE
  ======================== */
  const [cartItems, setCartItems] = useState([]);

  // 🔢 Derived cart count (BEST PRACTICE)
  const cartCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  /* =======================
     🔁 RESTORE STATE
  ======================== */
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedCart = localStorage.getItem("cart");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }

      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to restore state:", error);
    }
  }, []);

  /* =======================
     💾 PERSIST CART
  ======================== */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <BrowserRouter>
      {/* 🔝 GLOBAL NAVBAR */}
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        cartCount={cartCount}
      />

      {/* 🔀 ROUTES */}
      <Layout>
        <Routes>
          {/* 🏠 PRODUCTS */}
          <Route
            path="/"
            element={
              <Products
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />

          {/* 🔐 AUTH */}
          <Route
            path="/auth"
            element={
              <Auth
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
              />
            }
          />

          {/* 🛒 CART */}
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />

          {/* 💳 CHECKOUT */}
          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />

          {/* ✅ ORDER SUCCESS */}
          <Route
            path="/success"
            element={<OrderSuccess />}
          />

          {/* 📦 ORDER HISTORY */}
          <Route
            path="/orders"
            element={<Orders />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
