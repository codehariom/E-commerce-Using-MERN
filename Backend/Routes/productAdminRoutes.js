import express from "express"

import { admin } from "../Middlewares/adminAuth.js"
import { authenticateUser } from "../Middlewares/validateToken.js"
import { allProduct } from "../Controllers/productAdminControllers.js"


const router = express.Router()

// route get /api/admin/product
// @desc  Get all Product details   (admin only )
// @access private
router.get("/",authenticateUser ,admin, allProduct )

export default router;