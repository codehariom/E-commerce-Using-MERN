import React, { useEffect, useState } from "react";
import { SlRefresh } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

function MyOrderPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    setTimeout(() => {
      const demoOrders = [
        {
          id: "7310",
          createdAt: new Date(),
          shippingAddress: { city: "Hyderabad", country: "India" },
          orderItem: [
            { name: "T-shirt", image: "https://picsum.photos/200?random=1" },
            { name: "T-shirt", image: "https://picsum.photos/200?random=3" },
          ],
          totalPrice: 250,
          isPaid: true,
        },
        {
          id: "6310",
          createdAt: new Date(),
          shippingAddress: { city: "Hyderabad", country: "India" },
          orderItem: [
            { name: "Shirt", image: "https://picsum.photos/200?random=2" },
          ],
          totalPrice: 150,
          isPaid: false,
        },
      ];
      setOrders(demoOrders);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">My Orders</h2>

      <button
        onClick={handleRefresh}
        className="flex items-center gap-3 py-2 mb-4 rounded px-3 bg-orange-200 hover:text-white hover:bg-orange-500"
      >
        <SlRefresh /> <span>Refresh Orders</span>
      </button>

      <div className="relative sm:rounded-lg overflow-auto">
        <table className="min-w-full text-center text-black">
          <thead className="bg-orange-300 text-sm capitalize text-black">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => handleRowClick(order.id)}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:px-4">
                    <img
                      src={order.orderItem[0]?.image}
                      alt="Order item"
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-2 sm:px-4 font-medium text-black">
                    #{order.id}
                  </td>
                  <td className="py-2 px-2 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-2 sm:px-4">
                    {order.orderItem.length}
                  </td>
                  <td className="py-2 px-2 sm:px-4">${order.totalPrice}</td>
                  <td className="py-2 px-2 sm:px-4">
                    <span
                      className={`${
                        order.isPaid ? "bg-green-300" : "bg-red-300"
                      } py-1 px-2 rounded text-sm`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 px-4 text-gray-600">
                  You have no orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrderPage;
