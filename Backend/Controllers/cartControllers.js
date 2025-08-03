import expressAsyncHandler from "express-async-handler";
import Cart from "../Models/cartModel.js";
import { Product } from "../Models/productModel.js";
import { getCart } from "../Helper/guestId.js";

export const cart = expressAsyncHandler(async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    // Ensure quantity is a valid number
    const qty = Number(quantity);
    if (!productId || isNaN(qty) || qty <= 0) {
        return res.status(400).json({ message: "Invalid product or quantity" });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Get cart for this user or guest
        let cart = await getCart(userId, guestId);

        if (cart) {
            // Find if the product already exists in cart
            const productIndex = cart.product.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
                // Increase quantity if item already exists
                cart.product[productIndex].quantity = qty;
            } else {
                // Add new item to cart
                cart.product.push({
                    productId,
                    name: product.name,
                    image: product.images[0]?.url || "",
                    price: product.price,
                    size,
                    color,
                    quantity: qty,
                });
            }

            // Update total price
            cart.totalPrice = cart.product
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2);

            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create a new cart if none exists
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                product: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0]?.url || "",
                        price: product.price,
                        size,
                        color,
                        quantity: qty,
                    },
                ],
                totalPrice: Number((product.price * qty).toFixed(2)),
            });

            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export const deleteCart = expressAsyncHandler(async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart)
            return res.status(404).json({ message: "product is not found" });
        const productIndex = cart.product.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );
        if (productIndex > -1) {
            cart.product.splice(productIndex, 1);
            cart.totalPrice = cart.product.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res
                .status(404)
                .json({ message: "Product is not Found in cart " });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

export const getCartProduct = expressAsyncHandler(async (req, res) => {
    const { userId, guestId } = req.query;
    try {
        const cart = await getCart(userId, guestId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: "Cart is not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export const detailsCart = expressAsyncHandler(async (req, res) => {
    const { guestId } = req.body; // Assume guestId comes from req.body
    if (!guestId) {
        return res.status(400).json({ message: "Guest ID is required" });
    }

    try {
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if (guestCart) {
            if (guestCart.product.length === 0) {
                return res.status(400).json({ message: "Guest cart is empty" });
            }

            if (userCart) {
                guestCart.product.forEach((guestItem) => {
                    const productIndex = userCart.product.findIndex(
                        (item) =>
                            item.productId.toString() === guestItem.productId.toString() &&
                            item.size === guestItem.size &&
                            item.color === guestItem.color
                    );
                    if (productIndex > -1) {
                        userCart.product[productIndex].quantity = Number(guestItem.quantity);
                    } else {
                        userCart.product.push({
                            productId: guestItem.productId,
                            name: guestItem.name,
                            image: guestItem.image,
                            price: guestItem.price,
                            size: guestItem.size,
                            color: guestItem.color,
                            quantity: guestItem.quantity
                        });
                    }
                });
                userCart.totalPrice = Number(
                    userCart.product
                        .reduce((acc, item) => acc + item.price * item.quantity, 0)
                        .toFixed(2)
                );
                await userCart.save();

                try {
                    await Cart.findOneAndDelete({ guestId });
                } catch (error) {
                    console.error("Error deleting guest cart", error);
                    return res.status(500).json({ message: "Failed to delete guest cart" });
                }
                return res.status(200).json(userCart);
            } else {
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                guestCart.totalPrice = Number(
                    guestCart.product
                        .reduce((acc, item) => acc + item.price * item.quantity, 0)
                        .toFixed(2)
                );
                await guestCart.save();
                return res.status(200).json(guestCart);
            }
        } else {
            if (userCart) {
                userCart.totalPrice = Number(
                    userCart.product
                        .reduce((acc, item) => acc + item.price * item.quantity, 0)
                        .toFixed(2)
                );
                return res.status(200).json(userCart);
            }
            return res.status(404).json({ message: "Guest cart not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});

