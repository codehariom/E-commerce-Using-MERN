import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paypal from "./Paypal";

const cart = {
  product: [
    {
      name: "Stylish Jacket",
      size: "M",
      Color: "Black",
      price: 120,
      image: "https://picsum.photos/200?random=10",
    },
    {
      name: "Stylish Jacket",
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
  const [checkoutId, setCheckoutId] = useState(null);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pinCode: "",
    country: "",
    phone: "",
    state: "",
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();

    // Optional: basic validation
    if (
      !shippingAddress.firstName ||
      !shippingAddress.lastName ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pinCode ||
      !shippingAddress.phone
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    // Proceed to show PayPal button
    setCheckoutId(123); // Simulating a created checkout ID
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment successful!", details);
    navigate("/order-confirmation");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-3xl font-semibold uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-xl mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value="work.realhariom@gmail.com"
              disabled
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, phone: e.target.value })
              }
              placeholder="Enter Your Phone Number"
              className="w-full p-2 border rounded"
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                }
                placeholder="Enter Your First Name"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                }
                placeholder="Enter Your Last Name"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, address: e.target.value })
                }
                placeholder="Enter Your Full Address"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, city: e.target.value })
                }
                placeholder="Enter Your City"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">State</label>
              <input
                type="text"
                value={shippingAddress.state}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, state: e.target.value })
                }
                placeholder="Enter Your State"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Pin Code</label>
              <input
                type="text"
                value={shippingAddress.pinCode}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, pinCode: e.target.value })
                }
                placeholder="Enter Your Pin Code"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Submit or PayPal */}
          {!checkoutId ? (
            <button
              type="submit"
              className="bg-black text-white p-3 w-full rounded hover:bg-gray-900 transition"
            >
              Checkout Now
            </button>
          ) : (
            <div>
              <h3 className="text-lg mb-4">Pay with PayPal</h3>
              <Paypal
                amount="270.00"
                onSuccess={handlePaymentSuccess}
                onError={(err) => {
                  console.error("Payment error:", err);
                }}
              />
            </div>
          )}
        </form>
      </div>

      {/* Right section (Cart summary) */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="  py-4 mb-4 ">
            {cart.product.map((item, index) => (
          <div key={index} className="flex items-center  justify-between border-t  py-2 gap-4 mb-4">
            <div className=" flex items-start">
              <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover  rounded"
            />
            </div>
            <div>
              <h4 className="font-semibold capitalize">{item.name}</h4>
              <p>Size: {item.size}</p>
              <p>Color: {item.Color}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          </div>
        ))}
        </div>
        <div className="text-right border-t-4  font-bold text-lg">
          Total: ₹{cart.totalprice}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
