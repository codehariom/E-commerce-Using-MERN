import expressAsyncHandler from "express-async-handler";
import Cart from "../Models/cartModel.js";

export const getCart = expressAsyncHandler(async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
});
