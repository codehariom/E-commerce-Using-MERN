import expressAsyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.Cloudinary_name,
    api_key: process.env.Cloudinary_API_Key,
    api_secret: process.env.Cloudinary_API_Secret,
});

export const imageProductUpload = expressAsyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Function to handle streaming upload to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: "image" },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };

        const result = await streamUpload(req.file.buffer);
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        res.status(500).json({ message: "Server error" });
    }
});