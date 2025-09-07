import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { resetCheckout } from "../redux/checkoutSlice"; // Assuming this is the file with checkoutSlice

function OrderConfirmation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout, loading, error } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    }
    return () => dispatch(resetCheckout()); // Cleanup on unmount
  }, [checkout, dispatch, navigate]);

  const calcEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl p-6 text-center">
        <p className="text-gray-500">Loading order details...</p>
      </div>
    );
  }

  if (error || !checkout || !checkout._id) {
    return (
      <div className="mx-auto max-w-4xl p-6 text-center">
        <p className="text-red-500">
          {error || "Order not found. Please try again."}
        </p>
        <button
          className="mt-4 rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          onClick={() => navigate("/")}
        >
          Return to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-center text-3xl font-bold text-emerald-700 md:text-4xl">
        Thank You for Your Order!
      </h1>
      <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
        {/* Order Summary */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-800">
              Order ID: {checkout._id}
            </h2>
            <p className="text-sm text-gray-500">
              Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-sm text-emerald-700">
            Estimated Delivery: {calcEstimatedDelivery(checkout.createdAt)}
          </div>
        </div>

        {/* Items List */}
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Items</h3>
          {checkout.checkoutItem && checkout.checkoutItem.length > 0 ? (
            checkout.checkoutItem.map((item) => (
              <div
                key={item.productId}
                className="mb-4 flex items-center border-b border-gray-200 pb-4 last:border-b-0"
              >
                <img
                  src={item.images}
                  alt={item.name}
                  className="mr-4 h-16 w-16 rounded-md object-cover"
                  onError={(e) => (e.target.src = "/placeholder-image.jpg")} // Fallback image
                />
                <div className="flex-1">
                  <h4 className="text-base font-medium text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-base font-medium text-gray-800">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No items found in this order.</p>
          )}
        </div>

        {/* Payment & Delivery Info */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">Payment</h3>
            <p className="text-gray-600">{checkout.paymentMethod || "Cash On Delivery"}</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">Delivery Address</h3>
            <p className="text-gray-600">
              {checkout.shippingAddress?.address || ""},{" "}
              {checkout.shippingAddress?.city || ""},{" "}
              {checkout.shippingAddress?.postalCode || ""}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;