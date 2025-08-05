import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import expressAsyncHandler from "express-async-handler";
import fs from "fs";

// cloudinary config()

dotenv.config();

cloudinary.config({
    cloud_name: process.env.Cloudinary_name,
    api_key: process.env.Clodinary_API_Key,
    api_secret: process.env.Clodinary_API_Secret,
});

export const uploadOnCloudinary = expressAsyncHandler(async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
        });
        console.log("Photo is uploaded", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temp file as uplaod
        console.log("Error in photo uploading", error);
        return null;
    }
});

export default cloudinary;
