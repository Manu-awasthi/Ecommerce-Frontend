import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const cancelOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.orderId === orderId
        ? { ...order, status: "Cancelled" }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
  };

  return (
    <div className="min-h-screen bg-[#121212] px-6 py-8 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-400">
          No orders found
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map(order => (
            <div
              key={order.orderId}
              className="bg-[#1f1f1f] p-6 rounded-xl"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold">
                  Order ID: {order.orderId}
                </span>
                <span
                  className={`text-sm ${
                    order.status === "Cancelled"
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {order.status || "Placed"}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-2">
                {order.date}
              </p>

              {order.items.map(item => (
                <p key={item.id} className="text-sm">
                  {item.name} × {item.qty}
                </p>
              ))}

              <p className="mt-2 font-semibold">
                Total: ₹{order.totalAmount}
              </p>

              {order.status !== "Cancelled" && (
                <button
                  onClick={() => cancelOrder(order.orderId)}
                  className="mt-4 bg-red-500 px-4 py-1 rounded hover:bg-red-600"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
