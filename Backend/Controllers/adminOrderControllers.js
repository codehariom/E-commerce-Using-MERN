import expressAsyncHandler from "express-async-handler";
import { Order } from "../Models/orderModel.js";


export const allOrders = expressAsyncHandler (async(req, res)=>{
    try {
        const orders = await Order.find({}).populate("user","name","email")
        res.status(200).json(orders)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server Error"})
    }
})


export const orderUpdate = expressAsyncHandler(async(req, res)=>{
    try {
        const order = await Order.findById(req.params.id)
        if(order){
            order.status = req.body.status || order.status
            order.isDelivered = req.body.status==="Delivered" ? true :order.isDelivered
            order.deliveredAt = req.body.status==="Delivered" ? Date.now() :order.deliveredAt

            const updatedOrder = await order.save()

            res.status(200).json(updatedOrder)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server Error"})
    }
})

export const deleteOrder = expressAsyncHandler(async(req, res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            await Order.deleteOne();
            res.json({message:"Order Removed"})
        }else{
            res.status(404).json({message:"Order not found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server Error"})
    }
})