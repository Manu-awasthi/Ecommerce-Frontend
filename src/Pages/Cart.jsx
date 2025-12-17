import { useNavigate } from "react-router-dom";

function Cart({ cartItems = [], setCartItems }) {
  const navigate = useNavigate();

  
  const increaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  
  const decreaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  
  const removeItem = (id) => {
    setCartItems(items =>
      items.filter(item => item.id !== id)
    );
  };

  
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  
  const totalItems = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  
  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem("user");
    if (!isLoggedIn) {
      navigate("/auth");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] px-6 py-8 text-white">

      <h2 className="text-3xl font-bold mb-8 text-center">
        Your Cart
      </h2>

      
      {cartItems.length === 0 ? (
        <div className="text-center mt-20 text-gray-400">
          <p className="text-2xl">🛒 Your cart is empty</p>
          <p className="mt-2">Add products to see them here</p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

         
          <div className="md:col-span-2 space-y-6">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex gap-4 bg-[#1f1f1f] p-4 rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    ₹{item.price}
                  </p>

                 
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-1 bg-[#2a2a2a] rounded hover:bg-[#333]"
                    >
                      −
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-3 py-1 bg-[#2a2a2a] rounded hover:bg-[#333]"
                    >
                      +
                    </button>
                  </div>
                </div>

              
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          
          <div className="bg-[#1f1f1f] p-6 rounded-xl h-fit sticky top-24">
            <h3 className="text-xl font-semibold mb-4">
              Price Details
            </h3>

            <div className="flex justify-between mb-2 text-gray-300">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between mb-4 text-gray-300">
              <span>Total Price</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 py-2 rounded hover:bg-green-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
