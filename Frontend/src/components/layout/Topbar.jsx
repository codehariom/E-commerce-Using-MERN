import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";

function Topbar() {
  return (
    <div className=" bg-black text-white">
      <div className=" flex   p-1 justify-between items-center container mx-auto">
        <div className=" hidden md:flex  items-center space-x-7 ">
          <a href="#" className=" hover:text-gray-300">
            <TbBrandMeta size={25} />
          </a>
          <a href="#" className=" hover:text-gray-300">
            <FaInstagram size={24} />
          </a>
          <a href="#" className=" hover:text-gray-300">
            <IoLogoWhatsapp size={24} />
          </a>
        </div>
        <div className=" flex-grow text-sm text-center">
            <span> We are Shiping All over the India </span>
        </div>
        <div className="text-sm hidden md:block">
            <a href="tel:+9173010302696" className=" hover:text-gray-300"> +91 7310302696 </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
