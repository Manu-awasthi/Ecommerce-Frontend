import { useState } from "react";
import { products } from "../Data/products";
import ProductCard from "../Components/ProductCard";

function Products({ cartItems, setCartItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

 
  const categories = [
    "All",
    ...new Set(products.map(p => p.category))
  ];

  
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(p => p.category === selectedCategory);

  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-high") return a.price - b.price;
    if (sortOrder === "high-low") return b.price - a.price;
    return 0;
  });

  
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(
        item => item.id === product.id
      );

      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-[#121212] px-6 py-8">

      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Our Products
      </h2>

     
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8 max-w-7xl mx-auto">

       
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm
                ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-[#1f1f1f] text-gray-300"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

      
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-[#1f1f1f] text-white px-4 py-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>
      </div>

      
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto">
        {sortedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
