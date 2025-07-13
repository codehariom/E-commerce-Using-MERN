import React, { useState } from "react";


function OrderManagement() {
  const allOrders = Array.from({ length: 37 }, (_, i) => ({
    _id: `ORD${1000 + i}`,
    customer: `Customer ${i + 1}`,
    totalPrice: Math.floor(Math.random() * 1000) + 100,
    totalProducts: Math.floor(Math.random() * 5) + 1,
    status: "Processing",
  }));

  const [orders, setOrders] = useState(allOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  // Filtered list based on search
  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const markAsDelivered = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: "Delivered" } : order
      )
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset to first page on new search
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>

      {/* 🔍 Search Bar */}
      <div className="mb-4 w-full md:w-1/2 flex items-center gap-5  ">
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full  px-4 py-2 border  rounded shadow-sm "
        />
      </div>

      {/* 🧾 Order Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-200 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Total Products</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{order._id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">₹{order.totalPrice}</td>
                <td className="py-3 px-4">{order.totalProducts}</td>
                <td className="py-3 px-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  {order.status !== "Delivered" ? (
                    <button
                      onClick={() => markAsDelivered(order._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
                    >
                      Mark as Delivered
                    </button>
                  ) : (
                    <span className="text-green-700 font-medium">
                      Delivered
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {currentOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  No matching orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default OrderManagement;
