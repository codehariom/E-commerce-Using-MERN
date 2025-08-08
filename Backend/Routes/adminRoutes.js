import express from "express"
import { admin } from "../Middlewares/adminAuth"
import { authenticateUser } from "../Middlewares/validateToken"

const router = express.Router()

// route get /api/admin/users
// @desc  Get all User  (admin only )
// @access private
router.post("/admin/user", admin,authenticateUser,)

export default router;