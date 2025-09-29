import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminProducts } from "../redux/adminProductSlice";
import { fetchAllOrders } from "../redux/adminOrderSlice";

function AdminHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products = [], loading: productsLoading, error: productsError } =
  useSelector((state) => state.adminProducts);
  const {
    orders = [],
    totalOrders = 0,
    totalSales = 0,
    loading: ordersLoading = false,
    error: ordersError = null,
  } = useSelector((state) => {
    // console.log("adminOrders state:", state.adminOrders); // Debug log
    return state.adminOrders || {};
  });

  useEffect(() => {
    dispatch(fetchAdminProducts())
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      {productsLoading || ordersLoading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : productsError || ordersError ? (
        <div className="text-red-500 text-center">
          {productsError && <p>Error fetching products: {productsError}</p>}
          {ordersError && (
            <div>
              <p>Error fetching orders: {ordersError}</p>
              {ordersError.includes("403") || ordersError.includes("Admin access required") ? (
                <div>
                  <p>You do not have permission to view orders. Please log in as an admin.</p>
                  <button
                    onClick={handleLogout}
                    className="mt-2 text-blue-600 hover:underline"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    dispatch(fetchAllOrders());
                    dispatch(fetchAdminProducts());
                  }}
                  className="mt-2 text-blue-600 hover:underline"
                >
                  Retry
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white shadow-sm p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">Revenue</h2>
              <p className="text-3xl font-bold text-green-600">
                ${totalSales?.toFixed(2) || 0}
              </p>
            </div>
            <div className="bg-white shadow-sm p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
              <p className="text-3xl font-bold">{totalOrders || orders.length}</p>
              <Link to="/admin/orders" className="text-blue-600 hover:underline mt-2 block">
                Manage Orders
              </Link>
            </div>
            <div className="bg-white shadow-sm p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">Total Products</h2>
              <p className="text-3xl font-bold">{products.length || 0}</p>
              <Link to="/admin/products" className="text-blue-600 hover:underline mt-2 block">
                Manage Products
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            <div className="rounded overflow-x-auto shadow bg-white">
              <table className="min-w-full text-left text-gray-700">
                <thead className="bg-gray-200 text-xs uppercase">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      Order ID
                    </th>
                    <th scope="col" className="py-3 px-4">
                      User
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Total Price
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate(`/admin/orders/${order._id}`)}
                      >
                        <td className="p-4">{order._id}</td>
                        <td className="p-4">{order.user?.name || "Unknown"}</td>
                        <td className="p-4">${(order.totalPrice || 0).toFixed(2)}</td>
                        <td className="p-4">{order.status || "N/A"}</td>
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
        </>
      )}
    </div>
  );
}

export default AdminHomePage;