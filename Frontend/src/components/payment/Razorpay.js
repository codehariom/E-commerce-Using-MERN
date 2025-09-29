import React, { useState } from "react";
import axios from "axios";

const Razorpay = ({ checkoutId, totalPrice, user }) => {
  const [loading, setLoading] = useState(false);

  // Backend base URL from environment variable
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
      document.body.appendChild(script);
    });
  };


  const handlePayment = async () => {
    setLoading(true);

    try {
      // Load Razorpay script
      await loadRazorpayScript();

      // Create order
      const { data: order } = await axios.post(
        `${BASE_URL}/api/payment/order`,
        { totalPrice, checkoutId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_API_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Style Pop",
        description: "Order Payment",
        order_id: order.orderId,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              `${BASE_URL}/api/payment/verify`,
              {
                razorpay_orderId: response.razorpay_orderId,
                razorpay_paymentId: response.razorpay_paymentId,
                razorpay_signature: response.razorpay_signature,
                
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            if (verifyResponse.data.success) {
              console.success("Payment Successful! Order has been placed. 🎉");
            } else {
              console.error("Payment verification failed!");
            }
          } catch (error) {
            console.error("Payment Verification Error:", error);
            console.error(`Payment verification failed: ${error.response?.data?.message || error.message}`);
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        console.error(`Payment failed: ${response.error.description}`);
      });
      razorpay.open();
    } catch (error) {
      // console.error("Payment Error:", JSON.stringify(error, null, 2));
      console.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
    >
      {loading ? "Processing..." : `Pay ₹ ${totalPrice} with Razorpay`}
    </button>
  );
};

export default Razorpay;



