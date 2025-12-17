import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({
  isLoggedIn,
  user,
  setIsLoggedIn,
  setUser,
  cartCount = 0
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-[#121212] text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <h1
          className="text-xl font-bold text-blue-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ShopEasy
        </h1>

        {/* SEARCH (DESKTOP) */}
        <div className="hidden md:block">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-80 px-3 py-2 rounded bg-[#1f1f1f] outline-none"
          />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center">

          {/* CART */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* AUTH / USER */}
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/auth")}
              className="hover:underline"
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/orders")}
                className="hover:underline"
              >
                My Orders
              </button>

              <span className="text-sm text-gray-300">
                Hi, {user?.name}
              </span>

              <button
                onClick={logout}
                className="text-red-400 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-[#1f1f1f] mt-3 rounded shadow">

          {/* CART */}
          <button
            onClick={() => {
              navigate("/cart");
              setMenuOpen(false);
            }}
            className="block w-full px-4 py-2 text-left"
          >
            🛒 Cart ({cartCount})
          </button>

          {!isLoggedIn ? (
            <button
              onClick={() => {
                navigate("/auth");
                setMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-left"
            >
              Login / Signup
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/orders");
                  setMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-left"
              >
                📦 My Orders
              </button>

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
