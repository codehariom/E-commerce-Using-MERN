import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaBoxOpen, FaClipboardList, FaShop, FaUser } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const handelLogout = () => {
    // Clear session/auth logic if needed
    navigate("/");
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "bg-white bg-opacity-10 text-white py-3 px-4 rounded flex items-center space-x-2"
      : "text-white  hover:bg-orange-600 py-2 px-4 rounded flex items-center space-x-4";

  return (
    <div className="p-6 bg-gray-800 h-full min-h-screen text-white">
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          Rabbit
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink to="/admin/users" className={getNavLinkClass}>
          <FaUser />
          <span>Users</span>
        </NavLink>
        <NavLink to="/admin/products" className={getNavLinkClass}>
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>
        <NavLink to="/admin/orders" className={getNavLinkClass}>
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink to="/admin/shop" className={getNavLinkClass}>
          <FaShop />
          <span>Shop</span>
        </NavLink>
      </nav>
      <div className="mt-6">
        <button
          onClick={handelLogout}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
