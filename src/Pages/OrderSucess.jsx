import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
      <div className="bg-[#1f1f1f] p-8 rounded-xl text-center animate-pulse">

        <h2 className="text-3xl font-bold text-green-400 mb-4">
          🎉 Payment Successful!
        </h2>

        <p className="text-gray-300 mb-2">
          Your order has been placed successfully.
        </p>

        {orderId && (
          <p className="text-sm text-gray-400 mb-4">
            Order ID: <span className="text-white">{orderId}</span>
          </p>
        )}

        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
