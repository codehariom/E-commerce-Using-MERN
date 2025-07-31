import jwt from "jsonwebtoken";
import { User } from "../Models/userModel.js";
import dotenv from "dotenv";
import expressAsyncHandler from "express-async-handler";

// config the .env
dotenv.config();

// authenticate the user
export const authenticateUser = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.Jwt_Secret);

            // adijust based on jwt palyload
            req.user = await User.findById(decode.id).select("-password");

            // return if user is not found
            if (!req.user) {
                return res.status(404).json({ message: "User is not found" });
            }
            next()
        } catch (error) {
            console.error("JWT verfication Failed", error);
            res.status(401).json({ message: "User mot found" });
        }
    } else {
        res.status(401).json({ message: " Not Authorized  no token" });
    }
});
