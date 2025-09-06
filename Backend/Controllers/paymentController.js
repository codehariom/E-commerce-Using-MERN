import expressAsyncHandler from "express-async-handler";
import crypto from "crypto";
import { razorpayInstance } from "../Helper/razorpay.js";
import { Checkout } from "../Models/checkoutModel.js";
import { Order } from "../Models/orderModel.js";
import {Cart} from "../Models/cartModel.js";
import mongoose from "mongoose";

// Create Razorpay order
export const razorpayPayment = expressAsyncHandler(async (req, res) => {
  const { totalPrice, checkoutId } = req.body;
  const userId = req.user._id;

  // Validate inputs
  if (!totalPrice || !checkoutId) {
    return res.status(400).json({ message: "Total price and checkout ID are required" });
  }

  if (!mongoose.isValidObjectId(checkoutId)) {
    return res.status(400).json({ message: "Invalid checkout ID" });
  }

  // Verify checkout exists and belongs to the user
  const checkout = await Checkout.findById(checkoutId);
  if (!checkout) {
    return res.status(404).json({ message: "Checkout not found" });
  }
  if (checkout.user.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Unauthorized: Checkout does not belong to user" });
  }

  try {
    // Generate a short receipt (max 40 characters)
    const shortCheckoutId = checkoutId.slice(0, 12);
    const shortTimestamp = Date.now().toString().slice(-6);
    const receipt = `rcpt_${shortCheckoutId}_${shortTimestamp}`;
    // console.log("Generated receipt:", receipt, "Length:", receipt.length);

    const options = {
      amount: totalPrice * 100, // Convert to paise
      currency: "INR",
      receipt: receipt,
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res.status(401).json({ message: "Error creating Razorpay order" });
    }

    res.status(200).json({
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Razorpay Create Order Error:", JSON.stringify(error, null, 2));
    res.status(500).json({ message: "Server error while creating order"});
  }
});

// Verify payment and finalize checkout
export const verifyPayment = expressAsyncHandler(async (req, res) => {
  try {
    const {
      razorpay_orderId,
      razorpay_paymentId,
      razorpay_signature,
      checkoutId,
    } = req.body;
    const userId = req.user._id;

    // // Validate inputs
    // if (!razorpay_orderId || !razorpay_paymentId || !razorpay_signature || !checkoutId) {
    //   return res.status(400).json({ message: "Missing required payment details" });
    // }

    // Verify signature
    const sign = `${razorpay_orderId}|${razorpay_paymentId}`;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment Verifed sucessfully ", success: true });
    } 

    // Verify checkout
    const checkout = await Checkout.findById(checkoutId);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    if (checkout.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized: Checkout does not belong to user" });
    }

    // Update checkout
    checkout.isPaid = true;
    checkout.paymentStatus = "Paid";
    checkout.paymentDetails = {
      orderId: razorpay_orderId,
      paymentId: razorpay_paymentId,
    };
    checkout.paymentId = razorpay_paymentId;
    checkout.paidAt = new Date();
    await checkout.save();

    // Finalize checkout (create order and clear cart)
    if (!checkout.isFinalized) {
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItem: checkout.checkoutItem,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "Paid",
        paymentId: razorpay_paymentId,
      });

      checkout.isFinalized = true;
      checkout.finalizedAt = new Date();
      await checkout.save();

      await Cart.findOneAndDelete({ user: checkout.user });
      res.json({ success: true, message: "Payment verified and order created", order: finalOrder });
    } else {
      res.json({ success: true, message: "Payment verified, checkout already finalized" });
    }
  } catch (error) {
    console.error("Payment Verification Error:", JSON.stringify(error, null, 2));
    res.status(500).json({ message: "Server error during payment verification", error: error.message });
  }
});