import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile top bar with toggle button */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white items-center">
        <button onClick={toggleSidebar}>
          <FaBars size={25} />
        </button>
        <h1 className="ml-4 text-xl font-semibold">Admin Dashboard</h1>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 opacity-70 bg-black md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform transition-transform duration-300 z-20
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex-grow p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
