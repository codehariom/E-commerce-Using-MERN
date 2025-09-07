import expressAsyncHandler from "express-async-handler";
import { Checkout } from "../Models/checkoutModel.js";
import { Order } from "../Models/orderModel.js";
import { Cart } from "../Models/cartModel.js";

export const myOrder = expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.find({ user: req.user.id }).sort({
            createdAt: -1,
        });
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export const orderDetails = expressAsyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


export const createCODOrder = expressAsyncHandler(async (req, res) => {
  const { checkoutId, totalPrice } = req.body;
  const userId = req.user._id;

  if (!checkoutId || !totalPrice) {
    return res.status(400).json({ message: "Checkout ID and total price are required" });
  }

  const checkout = await Checkout.findById(checkoutId);
  if (!checkout) {
    return res.status(404).json({ message: "Checkout not found" });
  }
  if (checkout.user.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Unauthorized: Checkout does not belong to user" });
  }

  const order = new Order({
    user: checkout.user,
    orderItem: checkout.checkoutItem,
    shippingAddress: checkout.shippingAddress,
    paymentMethod: "cod",
    totalPrice: checkout.totalPrice,
    paymentStatus: "Pending",
    status: "Processing",
  });

  await order.save();
  checkout.isFinalized = true;
  checkout.finalizedAt = new Date();
  await checkout.save();

  await Cart.findOneAndDelete({ user: checkout.user });

  res.status(201).json({ message: "COD order created successfully", orderId: order._id });
});