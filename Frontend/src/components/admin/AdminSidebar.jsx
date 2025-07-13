import React from "react";
import {
  // FaSignOutAlt,
  FaBoxOpen,
  FaCartShopping,
  FaChartSimple,
  FaClipboardList,
  FaUser,
} from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout/auth clearing logic here if needed
    navigate("/");
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "bg-white text-black py-3 px-4 rounded flex items-center space-x-2"
      : "text-white hover:bg-orange-600 py-3 px-4 rounded flex items-center space-x-2";

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-white">
      <h2 className="text-xl font-bold mb-10 text-center">Style Pop Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink to="/admin" className={getNavLinkClass}>
          <FaChartSimple />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/new/product" className={getNavLinkClass}>
          <FaCartShopping />
          <span>Create Product</span>
        </NavLink>

        <NavLink to="/admin/users" className={getNavLinkClass}>
          <FaUser />
          <span>Users</span>
        </NavLink>

        <NavLink to="/admin/products" end className={getNavLinkClass}>
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink to="/admin/orders" className={getNavLinkClass}>
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
      </nav>

      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded flex items-center justify-center space-x-2 hover:bg-orange-600"
        >
          {/* <FaSignOutAlt /> */}
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
