import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import SerachBar from "../common/SerachBar";
import CartDrawer from "../layout/CartDrawer";

function Navbar() {
const [cartDrawer, setCartDrawer] = useState(false);

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
          <button onClick={toggleCartDrawer} className=" relative hover:text-black">
            <FaCartShopping size={22} />
            <span className=" bg-red-600 absolute -top-2 -right-4.5 text-white text-sm rounded-full px-1.5">
              4
            </span>
          </button>
          {/* searchbar */}
          <div className=" overflow-hidden">
            <SerachBar />
          </div>
        </div>
      </nav>
      <CartDrawer cartDrawer={cartDrawer} toggleCartDrawer={toggleCartDrawer}/>
    </>
  );
}

export default Navbar;
