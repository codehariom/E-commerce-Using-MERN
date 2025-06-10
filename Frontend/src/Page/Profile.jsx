import React from "react";
import MyOrderPage from "../components/products/MyOrderPage";

function Profile() {
  return (
    <div className=" min-h-screen flex flex-col">
      <div className=" flex-grow container mx-auto p-4 md:p-6">
        <div className=" flex flex-col md:flex-row md:space-x-7 space-x-7 md:space-y-3">
          {/* left side  */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-3xl md:text-3xl font-semibold mb-4">
              Hariom Gupta
            </h1>
            <p className=" text-xl md:text-lg mb-6">
              work.realhariom@gmail.com
            </p>
             <p className=" text-xl md:text-lg mb-6">
              user : Customer
            </p>
            <button className=" w-full bg-orange-400 hover:text-white py-2 rounded hover:bg-orange-500 ">
              Logout
            </button>
          </div>
          {/* right section  */}
          <div className="w-full md:w-2/3 lg:w-3/4">
          <MyOrderPage/>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Profile;
