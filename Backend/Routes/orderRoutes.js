import express from "express";
import { authenticateUser } from "../Middlewares/validateToken.js";
import { myOrder, orderDetails } from "../Controllers/orderControllers.js";
const router = express.Router();

// route get /api/order/my-order
// @desc get orders for logged-in user 
// @access private
router.get("/my-order",authenticateUser,myOrder)

// route get /api/order/:id
// @desc get orders by id
// @access private
router.get("/:id",authenticateUser,orderDetails)

export default router;
