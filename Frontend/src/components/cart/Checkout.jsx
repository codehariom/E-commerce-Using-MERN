import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Razorpay from "../payment/razorpay";
import { createCheckout, resetCheckout } from "../../redux/checkoutSlice";
import { clearCart } from "../../redux/cartSlice";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [formError, setFormError] = useState("");
  const [apiError, setApiError] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pinCode: "",
    country: "India",
    phone: "",
    state: "",
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (!cart?.products?.length) {
      navigate("/");
    }
  }, [cart, navigate]);

  // Validate form fields
  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
      "pinCode",
      "phone",
    ];
    for (const field of requiredFields) {
      if (!shippingAddress[field]) {
        setFormError(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`);
        return false;
      }
    }
    if (!paymentMethod) {
      setFormError("Please select a payment method.");
      return false;
    }
    setFormError("");
    return true;
  };


  // Handle checkout creation
const handleCreateCheckout = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  if (!cart?.products?.length) {
    setApiError("No items in cart");
    return;
  }
  console.log("Cart:", cart); // Debug cart state
  try {
    
    const action = await dispatch(
      createCheckout({
        checkoutItems: cart.products.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          images: item.image, 
        })),
        shippingAddress: {
          ...shippingAddress,
          postalCode: shippingAddress.pinCode,
        },
        paymentMethod,
        totalPrice: cart.totalPrice +100,
      })
    );
    if (createCheckout.fulfilled.match(action)) {
      setCheckoutId(action.payload._id);
      setApiError("");
    } else {
      throw new Error(action.payload?.message || "Failed to create checkout");
    }
  } catch (err) {
    setApiError(err.message);
  }
};

  // Handle successful payment
  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
  `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`, 
  { paymentStatus: "paid", paymentDetails: details },
  {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }
);
      if (response.status === 200) {
        await handleFinalizeCheckout(checkoutId);
      }
    } catch (err) {
      setApiError("Payment failed. Please try again.",err);
    }
  };

  // Finalize checkout
const handleFinalizeCheckout = async (checkoutId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
      {   },   
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }  
    );
    dispatch(clearCart());
    dispatch(resetCheckout());
    if (response.status === 201) {
      navigate("/order-confirmation");
      return response.data;
      
    } else {
      throw new Error("Order finalization failed");
    }
  } catch (error) {
    console.error("Error finalizing order:", error.response?.data || error.message);
    throw error;
  }
};

  // Handle COD confirmation
const handleCODConfirmation = async () => {
  if (!checkoutId) {
    setApiError("Checkout ID is missing. Please try again.");
    return;
  }
  setOrderConfirmed(true);
  
  dispatch(clearCart());
  dispatch(resetCheckout());
  navigate("/order-confirmation");
  try {
    console.log("COD checkoutId:", checkoutId);
    await handleFinalizeCheckout(checkoutId, "COD");
   
     
  } catch (err) {
    console.error("COD confirm failed:", err.response?.data || err.message);
    setOrderConfirmed(false);
  }
};


  if (loading) return <p className="text-center">Loading cart...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;
  if (!cart?.products?.length) return <p className="text-center">Your cart is empty</p>;

  return (
    <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 py-10">
      {/* Left Section: Checkout Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-3xl font-semibold uppercase mb-6">Checkout</h2>
        {formError && <p className="text-red-600 mb-4">{formError}</p>}
        {apiError && <p className="text-red-600 mb-4">{apiError}</p>}
        <form onSubmit={handleCreateCheckout}>
          {/* Contact Details */}
          <h3 className="text-xl mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full rounded border p-2 bg-gray-100"
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
              placeholder="Enter your phone number"
              className="w-full rounded border p-2"
            />
          </div>

          {/* Delivery Details */}
          <h3 className="text-xl mb-4">Delivery</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                }
                placeholder="Enter your first name"
                className="w-full rounded border p-2"
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
                placeholder="Enter your last name"
                className="w-full rounded border p-2"
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
                placeholder="Enter your full address"
                className="w-full rounded border p-2"
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
                placeholder="Enter your city"
                className="w-full rounded border p-2"
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
                placeholder="Enter your state"
                className="w-full rounded border p-2"
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
                placeholder="Enter your pin code"
                className="w-full rounded border p-2"
              />
            </div>
          </div>

          {/* Payment Method */}
          <h3 className="text-xl mb-4">Payment Method</h3>
          <div className="mb-6 space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio"
              />
              <span>Pay with Razorpay</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio"
              />
              <span>Cash on Delivery</span>
            </label>
          </div>

          {/* Checkout Button or Payment Component */}
          {!checkoutId ? (
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded hover:bg-gray-900 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : "Checkout Now"}
            </button>
          ) : paymentMethod === "razorpay" ? (
            <Razorpay
              onSuccess={handlePaymentSuccess}
              totalPrice={Math.round(cart.totalPrice +100)} 
              checkoutId={checkoutId} 
              user={user}
              onError={(err) => setApiError(`Payment failed: ${err.message}`)}
            />
          ) : !orderConfirmed ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-green-600">Cash on Delivery Selected</h3>
              <button
                type="button"
                onClick={handleCODConfirmation}
                className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
              >
                Confirm Order
              </button>
            </div>
          ) : (
            <div className="text-lg font-semibold text-green-700">
              🎉 Your order has been placed successfully with Cash on Delivery!
            </div>
          )}
        </form>
      </div>

      {/* Right Section: Order Summary */}
      <div className="bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="mb-4 py-4">
          {cart.products.map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b py-2 mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded object-cover"
              />
              <div className="text-sm space-y-1">
                <h4 className="font-semibold capitalize">{item.name}</h4>
                <p>Size: {item.size}</p>
                <p>Color: {item.color}</p>
                <p>Price: ₹{item.price.toLocaleString()}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between text-lg">
            <p className="font-semibold">Sub Total:</p>
            <p>₹{cart.totalPrice?.toLocaleString()}</p>
          </div>
          <div className="flex justify-between text-lg">
            <p className="font-semibold">Shipping Charge:</p>
            <p>₹100</p>
          </div>
          <div className="flex justify-between text-xl bg-black text-white p-2 rounded">
            <p className="font-semibold">Total:</p>
            <p>₹{(cart.totalPrice + 100).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;