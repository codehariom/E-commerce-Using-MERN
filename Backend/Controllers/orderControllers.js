import { Order } from "../Models/orderModel.js";
import expressAsyncHandler from "express-async-handler";

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
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if (!order) {
            return res.status(404).json({ message: "Order Is not found" });
        }
        res.status(200).json(order)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});
