import express from "express";
import { authenticateUser } from "../Middlewares/validateToken.js";
import { razorpayPayment, verifyPayment } from "../Controllers/paymentController.js";

const router = express.Router();

// @route POST /api/payment/create-order
// @desc Create Razorpay order
// @access Private
router.post("/order", authenticateUser, razorpayPayment);

// @route POST /api/payment/verify
// @desc Verify Razorpay payment and create order
// @access Private
router.post("/verify", authenticateUser, verifyPayment);

export default router;