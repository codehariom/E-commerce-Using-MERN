import React, { useEffect } from "react";
import { SlRefresh } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrder } from "../../redux/orderSlice";

function MyOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrder());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const handleRefresh = () => {
    dispatch(fetchUserOrder()); // better than reloading
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders.</p>;

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
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:px-4">
                    <img
                      src={order.orderItem?.[0]?.images || ""}
                      alt="Order item"
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-2 sm:px-4 font-medium text-black">
                    #{order._id}
                  </td>
                  <td className="py-2 px-2 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.address}, ${order.shippingAddress.city || ""}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-2 sm:px-4">
                    {order.checkoutItem?.quantity || order.orderItem.reduce((acc, item) => acc + item.quantity, 0)}
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
