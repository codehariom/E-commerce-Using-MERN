import express from "express"

import { admin } from "../Middlewares/adminAuth.js"
import { authenticateUser } from "../Middlewares/validateToken.js"
import { allProduct } from "../Controllers/productAdminControllers.js"
import { newProduct } from "../Controllers/productController.js"


const router = express.Router()

// route get /api/admin/product
// @desc  Get all Product details   (admin only )
// @access private
router.get("/",authenticateUser ,admin, allProduct )

// route post /api/product/new
// @desc create new product 
// @access admin
router.post("/new",authenticateUser,admin,newProduct)


export default router;