import expressAsyncHandler from "express-async-handler";
import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt";

// get all user
export const adminUser = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.find({});
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// create new user
export const createUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Already User Registered" });
        }

        // hased the password
        const hasedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hasedPassword,
            role: role || "Customer",
        });
        await user.save();
        res.status(201).json({ message: "User Created Sucessfuly", user });
    } catch (error) {
        console.error(error);
        res.json(500).json({ message: "Server Error" });
    }
});

// update user details 
export const updateUser = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User Not found " });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        const updateUser = await user.save();
        res.status(200).json({
            message: "User details update",
            user: updateUser,
        });
    } catch (error) {
        console.error(error);
        res.json(500).json("server error");
    }
});

// delete user details 

export const deleteUser = expressAsyncHandler(async(req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(user){
             await user.deleteOne()
             res.status(201).json({message:"User delete sucessfully"})
        }
        else{
            res.status(404).json({message:"User not found "})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server Error"})
    }
    
})
