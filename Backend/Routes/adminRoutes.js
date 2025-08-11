import express from "express"
import { admin } from "../Middlewares/adminAuth.js"
import { authenticateUser } from "../Middlewares/validateToken.js"
import { adminUser, createUser, deleteUser, updateUser } from "../Controllers/adminControllers.js"

const router = express.Router()

// route get /api/admin/users
// @desc  Get all User  (admin only )
// @access private
router.get("/users",authenticateUser ,admin ,adminUser)

// route post /api/admin/create-user
// @desc  Create a user   (admin only )
// @access private
router.post("/create-user",authenticateUser ,admin ,createUser)


// route put /api/admin/update-user
// @desc  update the user details  (admin only )
// @access private
router.put("/:id",authenticateUser ,admin ,updateUser)

// route put /api/admin/:id
// @desc  delete the user details  (admin only )
// @access private
router.delete("/:id",authenticateUser ,admin ,deleteUser)

export default router;