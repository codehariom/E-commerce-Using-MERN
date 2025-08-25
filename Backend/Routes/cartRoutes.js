import express from 'express'
import { authenticateUser } from '../Middlewares/validateToken.js'
import { cart, deleteCart, getCartProduct, mergeCart, updateCartItemQuantity } from '../Controllers/cartControllers.js';
const router = express.Router()

// route post /api/cart/
// @desc add a product to the cart for a guest or logged in user 
// @access public
router.post("/",cart)

// route delete /api/cart/
// @desc delete product from the cart for a guest or logged in user 
// @access public
router.delete("/",deleteCart)

// route get /api/cart/
// @desc get  cart for a guest user or logged in user 
// @access public
router.get("/", getCartProduct)

// route post /api/cart/details
// @desc merge gusest  cart and logged user cart
// @access public
router.post("/details", authenticateUser, mergeCart )

// route post /api/cart/
// @desc update cart item 
// @access public
router.put("/", updateCartItemQuantity )



export default router;