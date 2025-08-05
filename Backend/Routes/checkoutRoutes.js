import express from "express"
import { authenticateUser } from "../Middlewares/validateToken.js"
import { checkout, checkoutPaid, finalizeCheckout } from "../Controllers/checkoutController.js";

const router = express.Router()

// route post /api/checkout/
// @desc Create a new checkout session
// @access Private
router.post("/",authenticateUser,checkout)

// route put /api/checkout/:id/pay
// @desc update checkout to mark as paid after sucessfully paymnet
// @access Private
router.put("/:id/pay",authenticateUser,checkoutPaid)

// route post /api/checkout/:id/pay
// @desc checkout and convert to an order after payment confirmation
// @access Private
router.post("/:id/finalize",authenticateUser,finalizeCheckout)


export default router;
