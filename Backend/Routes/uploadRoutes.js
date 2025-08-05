import express from "express";
import { imageProductUpload } from "../Controllers/imageUploadControllers.js";
import {multerErrorHandler } from "../Middlewares/uploadFile.js";
import { authenticateUser } from "../Middlewares/validateToken.js";
import {picUpload}  from "../Middlewares/uploadFile.js";

const router = express.Router();

// Route: POST /api/product/new
// Description: Create new product
// Access: Admin
router.post("/", authenticateUser, picUpload.single('picture'), imageProductUpload, multerErrorHandler);



export default router;