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


function Layout({ children }) {
  const location = useLocation();


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
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  
  const [cartItems, setCartItems] = useState([]);

  
  const cartCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  
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

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <BrowserRouter>
     
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        cartCount={cartCount}
      />

    
      <Layout>
        <Routes>
          
          <Route
            path="/"
            element={
              <Products
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />

         
          <Route
            path="/auth"
            element={
              <Auth
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
              />
            }
          />

         
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />

          
          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />

          
          <Route
            path="/success"
            element={<OrderSuccess />}
          />

         
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
