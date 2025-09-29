import mongoose from "mongoose";

const orderItem = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        images: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        size: {
            type: String,
        },
        color: {
            type: String,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const orderModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItem: [orderItem],
    shippingAddress: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    paymentStatus: {
        type: String,
        default: "pending",
    },
    paymentId: {
            type: String,
            unique: true
        },
    status: {
        type: String,
        enum: ["Processing", "Shipping", "Delivered", "Cancelled"],
        default: "Processing",
    },
},{
    timestamps:true
});

export const Order = mongoose.model("Order", orderModel);
