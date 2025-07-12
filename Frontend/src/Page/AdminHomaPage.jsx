import React from "react";
import { Link } from "react-router-dom";

function AdminHomePage() {
  const orders = [
    {
      _id: 1234,
      user: {
        name: "Hariom",
      },
      TotalPrice: 120,
      status: "Pending",
    },
    {
      _id: 1235,
      user: {
        name: "Riya",
      },
      TotalPrice: 250,
      status: "Delivered",
    },
    {
      _id: 1236,
      user: {
        name: "Aman",
      },
      TotalPrice: 180,
      status: "Processing",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-sm p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Revenue</h2>
          <p className="text-3xl font-bold text-green-600">$12,045</p>
        </div>
        <div className="bg-white shadow-sm p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold">45</p>
          <Link to="/admin/orders" className="text-blue-600 hover:underline mt-2 block">
            Manage Orders
          </Link>
        </div>
        <div className="bg-white shadow-sm p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold">50</p>
          <Link to="/admin/products" className="text-blue-600 hover:underline mt-2 block">
            Manage Products
          </Link>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="rounded overflow-x-auto shadow bg-white">
          <table className="min-w-full text-left text-gray-700">
            <thead className="bg-gray-200 text-xs uppercase">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="p-4">{order._id}</td>
                    <td className="p-4">{order.user.name}</td>
                    <td className="p-4">${order.TotalPrice}</td>
                    <td className="p-4">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
