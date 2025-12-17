function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-400 mt-12">
      
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold text-blue-400 mb-3">
            ShopEasy
          </h2>
          <p className="text-sm">
            Your one-stop destination for electronics, fashion,
            accessories, and home essentials.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Products</li>
            <li className="hover:text-white cursor-pointer">Cart</li>
            <li className="hover:text-white cursor-pointer">Login</li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Categories
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Electronics</li>
            <li>Clothing</li>
            <li>Accessories</li>
            <li>Home</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Follow Us
          </h3>
          <div className="flex gap-4 text-xl">
            <span className="cursor-pointer hover:text-white">🌐</span>
            <span className="cursor-pointer hover:text-white">🐦</span>
            <span className="cursor-pointer hover:text-white">📸</span>
            <span className="cursor-pointer hover:text-white">💼</span>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 text-center py-4 text-sm">
        © {new Date().getFullYear()} ShopEasy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
