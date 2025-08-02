import express from "express"
import { authenticateUser } from "../Middlewares/validateToken.js"
import { allProduct, bestSeller, deleteProduct, newArrivals, newProduct, similarProduct, singleProduct, updateProduct } from "../Controllers/productController.js"
import { admin } from "../Middlewares/adminAuth.js"

const router = express.Router()
              
// route post /api/product/new
// @desc create new product 
// @access admin
router.post("/new",authenticateUser,admin,newProduct)

// route put /api/product/update
// @desc update the product 
// @access admin
router.put("/update/:id",authenticateUser,admin,updateProduct)

// route put /api/product/delete
// @desc delete the product 
// @access admin
router.delete("/delete/:id",authenticateUser,admin,deleteProduct)

// route get /api/product/
// @desc get all the product with optional query 
// @access Public
router.get("/", allProduct)

// route get /api/product/best-seller
// @desc get the best seller product
// @access Public
router.get("/best-seller", bestSeller)

// route get /api/product/new-aarivals
// @desc get the new arrivals product
// @access Public
router.get("/new-arrival", newArrivals )


// route get /api/product/id
// @desc get all the product with optional query 
// @access Public
router.get("/:id", singleProduct)

// route get /api/product/similar/:id
// @desc get similar product based on the current product gender and category 
// @access Public
router.get("/similar/:id", similarProduct)

export default router;