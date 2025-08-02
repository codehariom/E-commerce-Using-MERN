import mongoose from "mongoose";

const productModel = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        description: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        discountPrice: {
            type: Number,
        },
        countInStock: {
            type: Number,
            require: true,
            default: 0,
        },
        sku: {
            type: String,
            unique: true,
            require: true,
        },
        category: {
            type: String,
            require: true,
        },
        brand: {
            type: String,
        },
        sizes: {
            type: [String],
            require: true,
        },
        colors: {
            type: [String],
            require: true,
        },
        productCollection: {
            type: String,
            required: true,
        },
        material: {
            type: String,
        },
        gender: {
            type: String,
            enum: ["Men", "Women"],
        },
        images: [
            {
                url: {
                    type: String,
                    required: true,
                },
                altText: {
                    type: String,
                },
            },
        ],
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isPublished: {
            type: Boolean,
            default:true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        reviews: {
            type: Number,
            default: 0,
        },
        tags: [String],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        metaTitle: {
            type: String,
        },
        metaDescription: {
            type: String,
        },
        metaKeyword: {
            type: String,
        },
        dimensions: {
            length: Number,
            width: Number,
            hight: Number,
        },
        weight: Number,
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productModel);
