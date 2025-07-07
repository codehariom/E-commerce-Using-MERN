import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const cart = {
  product: [
    {
      name: "stylish jacket",
      size: "M",
      Color: "Black",
      price: 120,
      image: "https://picsum.photos/200?random=10",
    },
    {
      name: "stylish jacket",
      size: "L",
      Color: "White",
      price: 150,
      image: "https://picsum.photos/200?random=11",
    },
  ],
  totalprice: 270,
};

function Checkout() {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pinCode: "",
    country: "",
    phone: "",
    state:""
  });

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* left section  */}
      <div className="bg-white rounded-lg p-6 ">
        <h2 className=" text-3xl font-semibold uppercase mb-6"> Checkout</h2>
        <form action="">
          <h3 className="text-xl mb-4">Contact Deatils</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-4">Email</label>
            <input
              type="email"
              value="work.realhariom@gmail.com"
              disabled
              placeholder="Enter Your Email Address"
              className=" w-full p-2 border rounded "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-4">Phone Number</label>
            <input
              type="tel"
              value="+91 7310302696"
              placeholder="Enter Your Email Address"
              className=" w-full p-2 border rounded "
            />
          </div>
          <h3 className=" text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="mb-3">
              <label className="block text-gray-700 mb-4">First Name</label>
              <input
                type="text"
                value="work.realhariom"
                onChange={(e)=>setShippingAddress({...shippingAddress, firstName:e.target.value})}
                placeholder="Enter Your First Name"
                className=" w-full p-2 border rounded "
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 mb-4">Last Name</label>
              <input
                type="text"
                value="realhariom@gmail.com"
                onChange={(e)=>setShippingAddress({...shippingAddress, lastName:e.target.value})}
                placeholder="Enter Your Email Address"
                className="w-full p-2 border rounded "
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="mb-3">
              <label className="block text-gray-700 mb-4">Address</label>
              <input
                type="text"
               onChange={(e)=>setShippingAddress({...shippingAddress, address:e.target.value})}

                placeholder="Enter Your Full Address"
                className=" w-full p-2 border rounded "
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 mb-4">City</label>
              <input
                type="text"
                onChange={(e)=>setShippingAddress({...shippingAddress, city:e.target.value})}
                placeholder="Enter Your City"
                className="w-full p-2 border rounded "
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="mb-3">
              <label className="block text-gray-700 mb-4">State</label>
              <input
                type="text"
                onChange={(e)=>setShippingAddress({...shippingAddress, state:e.target.value})}
                placeholder="Enter Your State"
                className=" w-full p-2 border rounded "
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 mb-4">Pin Code</label>
              <input
                type="number"
                value="varanasi"
                placeholder="Enter Your Pin Code"
                className="w-full p-2 border rounded "
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
