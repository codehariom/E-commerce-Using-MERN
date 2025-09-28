import mongoose from "mongoose";

const userModel = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
            uppercase:true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            match: [/.+\@.+\../, "Please Enter the Valid Email"],
        },
        password: {
            type: String,
            require: true,
            minLength: 6,
        },
        role: {
            type: String,
            enum: ["admin", "customer"],
            default: "Customer",
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userModel);
