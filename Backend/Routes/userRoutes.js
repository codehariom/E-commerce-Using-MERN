  import express from "express";
  import { loginUser, registerUser, userLogout, userProfile } from "../Controllers/authControllers.js";


const router = express.Router();

  // route post /api/user/register 
  // @desc Register a new user 
  // @access public
  
router.post("/register", registerUser)
router.get("/profile",userProfile)
router.post("/logout",userLogout)
router.post("/login",loginUser)

export default router;