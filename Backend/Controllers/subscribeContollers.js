import expressAsyncHandler from "express-async-handler";
import { Subscriber } from "../Models/subscriberModel.js";

export const subscribeNow = expressAsyncHandler(async(req, res)=>{
    const {email} = req.body;

    if(!email){
        return res.status(400).json({message:"Email is required"})
    }

    try {
        let subscribe = await Subscriber.findOne({email});
        if(subscribe){
            return res.status(400).json({message:"Email is Already Subscribed"})
        }

        // create new subscriber 
        subscribe = new Subscriber({email})
        await subscribe.save();
        res.status(201).json({message:"Sucessfully Subscribe to our news letter"})
    } catch (error) {
        console.log(error)
        res.status(500).json("server error")
    }
})