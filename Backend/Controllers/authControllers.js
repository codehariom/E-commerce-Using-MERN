import expressAsyncHandler from "express-async-handler";
import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// .env config
dotenv.config();

// user register
export const registerUser = expressAsyncHandler(async (req, res) => {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    // field Requried check

    if (!name || !email || !password) {
        return res.status(400).json("All Field Required ");
    }

    const userExit = await User.findOne({ email });
    if (userExit) {
        return res.status(409).json({ message: "User Already Registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        email,
        name,
        password: hashedPassword,
    });

    return res.status(201).json({
        message: "User Registered Successfully",
        user: {
            name: newUser.name,
            email: newUser.email,
            role:newUser.role,
            password: newUser.password,
        },
    });
});

// Login User
export const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "Email not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
        { id: user._id, email: user.email  },
        process.env.Jwt_Secret,
        { expiresIn: process.env.Jwt_timeout || "24h" } // Fallback to 1 hour
    );

    // Return user data and token
    return res.status(200).json({
        user: {
            id: user._id,
            email: user.email,
            role:user.role,
            name: user.name, // Include additional fields as needed
        },
        token,
    });
});

// user profile
export const userProfile = expressAsyncHandler(async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }

        // Fetch user from MongoDB
        const user = await User.findById(req.user._id).select(
            "name email role"
        );

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        // Return user data
        res.json({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// user logout
export const userLogout = expressAsyncHandler(async (req, res) => {
    try {
        // check if user is authenticated
        if (!req.user) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }
        // clear authentitcation cokkie or remove jwt secret
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        });

        res.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Error during logout", error);
        res.status(500).json({ message: "server Error", success: false });
    }
});
