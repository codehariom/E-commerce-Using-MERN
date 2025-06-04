import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import SerachBar from "../common/SerachBar";
import CartDrawer from "../layout/CartDrawer";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [cartDrawer, setCartDrawer] = useState(false);
  const [navDrawer, setNavDrawer] = useState(false);

  const toggelNavDrawer = () => {
    setNavDrawer(!navDrawer);
  };

  const toggleCartDrawer = () => {
    setCartDrawer(!cartDrawer);
  };

  return (
    <>
      <nav className=" container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo  */}
        <div>
          <Link to="/" className="text-2xl font-semibold">
            StylePop
          </Link>
        </div>
        {/* Menu  */}
        <div className=" hidden md:flex space-x-6">
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-semibold uppercase"
          >
            Men
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-semibold uppercase"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-semibold uppercase"
          >
            Top wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-semibold uppercase"
          >
            Bottom Wear
          </Link>
        </div>
        {/* CTA Button  */}
        <div className=" flex items-center space-x-7">
          <Link to="/profile" className="text-gray-700 hover:text-black ">
            <FaUser size={20} />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className=" relative hover:text-black"
          >
            <FaCartShopping size={22} />
            <span className=" bg-red-600 absolute -top-2 -right-4.5 text-white text-sm rounded-full px-1.5">
              4
            </span>
          </button>
          {/* searchbar */}
          <div className=" overflow-hidden">
            <SerachBar />
          </div>
          <button className="md:hidden" onClick={toggelNavDrawer}>
            <HiMiniBars3BottomRight size={25} />
          </button>
        </div>
      </nav>
      <CartDrawer cartDrawer={cartDrawer} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile nav  */}

      <div
        className={` fixed top-23 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform  transition-transform duration-300 z-50 ${
          navDrawer ? "translate-x-0 " : "-translate-x-full"
        }`}
      >
        <div className=" flex justify-end p-4 ">
          <button onClick={toggelNavDrawer}>
            <IoMdClose size={25} />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className=" space-y-2">
            <Link
              to="#"
              onClick={toggelNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="#"
              onClick={toggelNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="#"
              onClick={toggelNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Topwear
            </Link>
            <Link
              to="#"
              onClick={toggelNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Bottomwear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
