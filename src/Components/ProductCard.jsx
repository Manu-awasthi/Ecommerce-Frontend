import { useState } from "react";

function ProductCard({ product, onAddToCart }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);

    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="relative bg-[#1f1f1f] text-white rounded-xl shadow-lg hover:scale-[1.03] transition">

      {/* ❤️ WISHLIST */}
      <button
        onClick={() => setWishlisted(!wishlisted)}
        className="absolute top-3 right-3 text-xl"
      >
        {wishlisted ? "❤️" : "🤍"}
      </button>

      {/* ❌ OUT OF STOCK */}
      {!product.inStock && (
        <span className="absolute top-3 left-3 bg-red-500 text-xs px-2 py-1 rounded">
          Out of Stock
        </span>
      )}

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className={`w-full h-48 object-cover rounded-t-xl ${
          !product.inStock ? "opacity-50" : ""
        }`}
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {product.name}
        </h3>

        <p className="text-yellow-400 text-sm mt-1">
          ⭐ {product.rating}
        </p>

        <p className="text-sm text-gray-400 mt-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-blue-400 font-bold">
            ₹{product.price}
          </span>

          <button
            disabled={!product.inStock || added}
            onClick={handleAdd}
            className={`px-4 py-1.5 rounded
              ${
                !product.inStock
                  ? "bg-gray-600 cursor-not-allowed"
                  : added
                  ? "bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
