import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Checkout({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("user");
  if (!isLoggedIn) return <Navigate to="/auth" />;

  if (cartItems.length === 0) {
    return <Navigate to="/" />;
  }

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // 🔑 Order ID
  const generateOrderId = () =>
    "ORD-" + Math.floor(Math.random() * 1000000);

  // ✅ Basic address validation
  const isAddressValid = Object.values(address).every(
    field => field.trim() !== ""
  );

  // FINAL ORDER PLACE
  const confirmPlaceOrder = () => {
    setProcessing(true);

    const orderId = generateOrderId();

    const newOrder = {
      orderId,
      items: cartItems,
      totalAmount,
      paymentMethod,
      address,
      status: "Placed",
      date: new Date().toLocaleString()
    };

    const orderHistory =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...orderHistory, newOrder])
    );

    setTimeout(() => {
      setCartItems([]);           // 🧹 clear cart
      setProcessing(false);
      setShowConfirm(false);
      navigate("/success", { state: { orderId } });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#121212] px-6 py-8 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Checkout
      </h2>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

        {/* ADDRESS */}
        <div className="bg-[#1f1f1f] p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            Shipping Address
          </h3>

          {Object.keys(address).map(field => (
            <input
              key={field}
              placeholder={field.toUpperCase()}
              value={address[field]}
              onChange={(e) =>
                setAddress({ ...address, [field]: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 bg-[#121212] rounded outline-none"
            />
          ))}
        </div>

        {/* SUMMARY + PAYMENT */}
        <div className="bg-[#1f1f1f] p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            Order Summary
          </h3>

          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex justify-between text-sm mb-2"
            >
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr className="my-3 border-gray-700" />

          <div className="flex justify-between font-semibold mb-4">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          {/* 💳 RAZORPAY DEMO */}
          <div className="bg-black border border-gray-700 p-4 rounded mb-4">
            <h4 className="text-blue-400 font-semibold mb-2">
              Razorpay Secure Payment (Demo)
            </h4>

            <input
              placeholder="UPI ID / Card Number"
              className="w-full mb-2 px-3 py-2 bg-[#121212] rounded outline-none"
            />
            <input
              placeholder="OTP"
              className="w-full px-3 py-2 bg-[#121212] rounded outline-none"
            />
          </div>

          {/* PLACE ORDER */}
          <button
            disabled={!isAddressValid || processing}
            onClick={() => setShowConfirm(true)}
            className={`w-full py-2 rounded font-semibold transition
              ${
                !isAddressValid || processing
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
          >
            {processing ? "Processing Payment..." : "Pay Now"}
          </button>
        </div>
      </div>

      {/* 🔔 CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-80 text-center animate-pulse">
            <h3 className="text-xl font-semibold mb-3">
              Confirm Order
            </h3>

            <p className="text-gray-400 mb-5">
              Are you sure you want to place this order?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-700 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={confirmPlaceOrder}
                className="flex-1 bg-green-500 py-2 rounded hover:bg-green-600"
              >
                Yes, Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
