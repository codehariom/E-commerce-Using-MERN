import expressAsyncHandler from "express-async-handler";
import {Cart} from "../Models/cartModel.js";
import { Checkout } from "../Models/checkoutModel.js";
import { Order } from "../Models/orderModel.js";
import {v4 as uuidv4 } from "uuid"


export const checkout = expressAsyncHandler(async (req, res) => {
  const { checkoutItem, shippingAddress, paymentMethod, totalPrice } = req.body;

  // Validate inputs
  if (!checkoutItem || (Array.isArray(checkoutItem) && checkoutItem.length === 0)) {
    return res.status(400).json({ message: "No items in checkout" });
  }
  if (!shippingAddress || !paymentMethod) {
    return res.status(400).json({ message: "Shipping address and payment method are required" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItem,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentId: uuidv4(), // Generate unique paymentId
      paymentStatus: "Pending", // Fixed typo
      isPaid: false,
    });
    // console.log(`Checkout created for user: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout session", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Other controllers (checkoutPaid, finalizeCheckout) remain unchanged
export const checkoutPaid = expressAsyncHandler(async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout Not found" });
        }
        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();
            res.status(200).json(checkout);
        } else {
            res.status(400).json({ message: "Invalid Payment Status" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// Finalize Checkout Controller

export const finalizeCheckout = expressAsyncHandler(async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    const checkoutId = req.params.id;

    // 1. Find checkout
    const checkout = await Checkout.findById(checkoutId).populate("user");
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    // 2. Prevent double finalization
    if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout already finalized" });
    }
    

    let finalOrder;

    // 3. Handle COD
    if (paymentMethod === "cod") {
      finalOrder = await Order.create({
        user: checkout.user?._id,
        orderItem: checkout.checkoutItem,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: "cod",
        totalPrice: checkout.totalPrice,
        isPaid: false,                // COD is not prepaid
        paymentStatus: "pending",     // waiting for cash on delivery
        isDelivered: false,
      });
    }

    // 4. Handle Prepaid (Razorpay / UPI / Card)
    else {
      
      finalOrder = await Order.create({
        user: checkout.user?._id,
        orderItem: checkout.checkoutItem,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paymentId: uuidv4(),
        paidAt: checkout.paidAt,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
        isDelivered: false,
      });
    }

    // 5. Mark checkout as finalized
    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();

    // 6. Clear user's cart
    await Cart.findOneAndDelete({ user: checkout.user._id });

    // 7. Return order
    res.status(201).json({ message: "Order confirmed", order: finalOrder });

  } catch (error) {
    console.error("Finalize checkout error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
