import express from "express"
import { subscribeNow } from "../Controllers/subscribeContollers.js"

const router = express.Router()

// route post /api/subscribe
// @desc  subscribe the new upadte from customer 
// @access public
router.post("/",subscribeNow)

export default router;