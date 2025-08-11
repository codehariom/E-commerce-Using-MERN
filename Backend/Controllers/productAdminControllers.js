import { Product } from "../Models/productModel.js";
import expressAsyncHandler from "express-async-handler";

export const allProduct = expressAsyncHandler(async(req, res)=>{
    try {
        const products = await Product.find({})
        res.status(201).json({message:"All Product",products})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server Error"})
    }
})

