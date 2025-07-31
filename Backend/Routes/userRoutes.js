  import express from "express";
  import { loginUser, registerUser, userLogout, userProfile } from "../Controllers/authControllers.js";
import { authenticateUser } from "../Middlewares/validateToken.js";


const router = express.Router();

  // route post /api/user/register 
  // @desc Register a new user 
  // @access public
  
router.post("/register", registerUser)
router.get("/userProfile",authenticateUser ,userProfile)
router.post("/logout",authenticateUser,userLogout)
router.post("/login",loginUser)

export default router;