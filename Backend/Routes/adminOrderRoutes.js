import express from "express"
import { admin } from "../Middlewares/adminAuth.js"
import { authenticateUser } from "../Middlewares/validateToken.js"
import { allOrders, deleteOrder, orderUpdate } from "../Controllers/adminOrderControllers.js"

const router = express.Router()


// route get /api/admin/orders
// @desc  Get all Orders details   (admin only )
// @access private
router.get("/",authenticateUser ,admin, allOrders )


// route put /api/admin/order/:id
// @desc  update Order Status  (admin only )
// @access private
router.get("/:id",authenticateUser ,admin, orderUpdate )

// route delete /api/admin/order/:id
// @desc  delete Order details  (admin only )
// @access private
router.delete("/:id",authenticateUser ,admin, deleteOrder )

export default router 