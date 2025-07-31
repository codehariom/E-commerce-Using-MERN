import expressAsyncHandler from "express-async-handler"
import {User} from "../Models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

// .env config
dotenv.config();

// user register 
export const registerUser = expressAsyncHandler(async(req,res)=>{
    const name = req.body.name?.trim();
    const email =req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    

    // field Requried check 

    if(!name|| !email||!password){
        return res.status(400).json("All Field Required ")
    }

    const userExit = await User.findOne({email});
    if (userExit){
        return res.status(409).json({message:"User Already Registered"})
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await User.create({
        email,name,password:hashedPassword

    });

    return res.status(201).json({
        message:"User Registered Successfully",
        user:{
            name:newUser.name,
            email:newUser.email,
            password:newUser.password
        }
    })

})

// Login User 
export const loginUser = expressAsyncHandler (async(req,res)=>{
    const{email,password} = req.body;

    // Feild required 
    if(!email || !password){
        return res.status(400).json("email and password is required ");
    }

    const user = await User.findOne({email});

    if(!email){
        return res.status(404).json({message:"Email is not Found "});
    }

    const userCount = await User.countDocuments();
    if(userCount===0){
        return res.status(403).json({message:"No user Registerd"});
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        res.status(401);
        throw new Error("Invalid email or password")
    }

    const accessToken = jwt.sign({
        email:user.email,
        id:user._id
    },
process.env.Jwt_Secret,
{expiresIn:process.env.Jwt_timeout}
)

})


// user profile
export const userProfile = expressAsyncHandler(async(req, res) => {
    try {
        // Fetch user from MongoDB using the user ID from req.user
        const user = await User.findById(req.user._id).select('name email role');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user data
        res.json({
            user: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// user logout 
export const userLogout = (req, res)=>{
    res.json({message:"Logout Sucessfully"})
}