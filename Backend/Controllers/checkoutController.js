import expressAsyncHandler from "express-async-handler";
import Cart from "../Models/cartModel.js";
import { Checkout } from "../Models/checkoutModel.js";
// import { Product } from "../Models/productModel.js";
import { Order } from "../Models/orderModel.js";
// import { User } from "../Models/userModel.js";

export const checkout = expressAsyncHandler(async (req, res) => {
    const { checkoutItem, shippingAddress, paymentMethod, totalPrice } =
        req.body;

    // Validate inputs
    if (
        !checkoutItem ||
        (Array.isArray(checkoutItem) && checkoutItem.length === 0)
    ) {
        return res.status(400).json({ message: "No items in checkout" });
    }
    if (!shippingAddress || !paymentMethod) {
        return res
            .status(400)
            .json({
                message: "Shipping address and payment method are required",
            });
    }

    try {
        // create a new checkout session
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItem: checkoutItem,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pendig",
            isPaid: false,
        });
        console.log(`Chekout crated for user : ${req.user_id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error creating checkout session", error);
        res.status(500).json({ message: "Server Error" });
    }
});

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

export const finalizeCheckout = expressAsyncHandler(async (req, res) => {
    const checkout = await Checkout.findById(req.params.id);
    try {
        if (!checkout) {
            return res.status(400).json({ message: "Checkout not found" });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            // create final order based on the checkout details
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItem: checkout.checkoutItem,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            // mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            await Cart.findOneAndDelete({ user: checkout.user });
            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({ message: "Checkout already finalized" });
        } else {
            res.status(400).json({ message: "Checkout is not paid" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
});
