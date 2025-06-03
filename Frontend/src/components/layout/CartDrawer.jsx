import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../cart/CartContent";


function CartDrawer({ cartDrawer, toggleCartDrawer }) {
  return (
    <div
      className={` fixed top-0 right-0 w-2/4 sm:w-1/2 md:w-[25rem] h-full bg-white shadow-lg transform transition-transform  duration-300 flex flex-col z-50 ${
        cartDrawer ? "translate-x-0" : "translate-x-full"
      }`}
    > 
      <div className=" flex p-4 justify-end ">
        <button onClick={toggleCartDrawer}>
          <IoMdClose size={30}  className=""/>
        </button> 
       
      </div>
       {/* cart scrollable with scrollable area  */}
        <div className=" flex-grow p-4 overflow-y-auto">
          <h2 className=" text-xl font-semibold mb-4"> Your cart </h2>
          <CartContent/>
        </div>
        {/* checkout button  */}
        <div className=" sticky bottom-0 p-4 bg-white">
          <button className=" w-full bg-orange-300 text-black py-3 rounded-xl font-semibold hover:bg-orange-600 hover:text-white transition">
            Checkout
          </button>
          <p className=" text-sm tracking-tight text-gray-400 mt-2 text-center">
            Shiping, Taxes and Distcount code Calculated at Checkout.
          </p>
        </div>
    </div>
  );
}

export default CartDrawer;
