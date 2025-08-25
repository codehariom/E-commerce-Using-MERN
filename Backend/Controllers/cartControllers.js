import expressAsyncHandler from "express-async-handler";
import Cart from "../Models/cartModel.js";
import { Product } from "../Models/productModel.js";
import { getCart } from "../Helper/guestId.js";

// Add or update item in cart
export const cart = expressAsyncHandler(async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  // Validate input
  if (!productId || !quantity || !size || !color) {
    // console.log("cart - Invalid input:", { productId, quantity, size, color, guestId, userId });
    return res.status(400).json({ message: "Product ID, quantity, size, and color are required" });
  }

  const qty = Number(quantity);
  if (isNaN(qty) || qty <= 0) {
    
    return res.status(400).json({ message: "Quantity must be a positive number" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await getCart(userId, guestId);
    // console.log("cart - Fetched cart:", { userId, guestId, cart });

    if (cart) {
      const productIndex = cart.product.findIndex(
        (p) => p.productId.toString() === productId && p.size === size && p.color === color
      );

      if (productIndex > -1) {
        cart.product[productIndex].quantity = qty;
      } else {
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

      cart.totalPrice = Number(
        cart.product.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
      );

      await cart.save();
    //   console.log("cart - Updated cart:", { cart });

      return res.status(200).json({
        products: cart.product, // Transform to products for frontend
        totalPrice: cart.totalPrice,
      });
    } else {
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : `guest_${new Date().getTime()}`,
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

    //   console.log("cart - Created new cart:", { newCart });
      return res.status(201).json({
        products: newCart.product,
        totalPrice: newCart.totalPrice,
      });
    }
  } catch (error) {
    console.error("Cart  Error:", { userId, guestId, error: error.message });
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// Delete item from cart
export const deleteCart = expressAsyncHandler(async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  // Validate input
  if (!productId || !size || !color) {
    console.log("deleteCart - Invalid input:", { productId, size, color, guestId, userId });
    return res.status(400).json({ message: "Product ID, size, and color are required" });
  }

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      console.log("deleteCart - Cart not found:", { userId, guestId });
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.product.findIndex(
      (p) => p.productId.toString() === productId && p.size === size && p.color === color
    );

    if (productIndex > -1) {
      cart.product.splice(productIndex, 1);
      cart.totalPrice = cart.product.reduce((acc, item) => acc + item.price * item.quantity, 0);

      await cart.save();
      console.log("deleteCart - Updated cart:", { cart });
      return res.status(200).json({
        products: cart.product,
        totalPrice: cart.totalPrice,
      });
    } else {
      console.log("deleteCart - Product not in cart:", { productId, size, color });
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("deleteCart - Error:", { userId, guestId, error: error.message });
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
});


// Get cart for a user or guest
export const getCartProduct = expressAsyncHandler(async (req, res) => {
  const { userId, guestId } = req.query;

  // Validate input
  if (!userId && !guestId) {
    // console.log("getCartProduct - Missing userId and guestId");
    return res.status(400).json({ message: "userId or guestId is required" });
  }

  try {
    const cart = await getCart(userId, guestId);
    // console.log("getCartProduct - Fetched cart:", { userId, guestId, cart });

    // Return empty cart if none exists
    const response = {
      products: cart ? cart.product : [],
      totalPrice: cart ? cart.totalPrice : 0,
    };

    res.json(response);
  } catch (error) {
    console.error("getCartProduct - Error:", { userId, guestId, error: error.message });
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// Merge guest cart into user cart
export const mergeCart = expressAsyncHandler(async (req, res) => {
  const { guestId } = req.body;
  const userId = req.user?._id;

  // Validate input
  if (!guestId) {
    // console.log("mergeCart - Missing guestId");
    return res.status(400).json({ message: "Guest ID is required" });
  }
  if (!userId) {
    // console.log("mergeCart - Missing userId");
    return res.status(401).json({ message: "User authentication required" });
  }

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: userId });

    // console.log("mergeCart - Fetched carts:", { guestCart, userCart });

    if (guestCart) {
      if (guestCart.product.length === 0) {
        // console.log("mergeCart - Guest cart is empty:", { guestId });
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
              quantity: guestItem.quantity,
            });
          }
        });
        userCart.totalPrice = Number(
          userCart.product.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
        );
        await userCart.save();

        await Cart.findOneAndDelete({ guestId });
        // console.log("mergeCart - Merged and deleted guest cart:", { userCart });
        return res.status(200).json({
          products: userCart.product,
          totalPrice: userCart.totalPrice,
        });
      } else {
        guestCart.user = userId;
        guestCart.guestId = undefined;
        guestCart.totalPrice = Number(
          guestCart.product.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
        );
        await guestCart.save();
        // console.log("mergeCart - Converted guest cart to user cart:", { guestCart });
        return res.status(200).json({
          products: guestCart.product,
          totalPrice: guestCart.totalPrice,
        });
      }
    } else {
      if (userCart) {
        userCart.totalPrice = Number(
          userCart.product.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
        );
        // console.log("mergeCart - Returning user cart:", { userCart });
        return res.status(200).json({
          products: userCart.product,
          totalPrice: userCart.totalPrice,
        });
      }
    //   console.log("mergeCart - No guest or user cart found:", { guestId, userId });
      return res.status(200).json({ products: [], totalPrice: 0 });
    }
  } catch (error) {
    // console.error("mergeCart - Error:", { guestId, userId, error: error.message });
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// Update item quantity in cart
export const updateCartItemQuantity = expressAsyncHandler(async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  // Validate input
  if (!productId || !quantity || !size || !color) {
    console.log("updateCartItemQuantity - Invalid input:", { productId, quantity, size, color, guestId, userId });
    return res.status(400).json({ message: "Product ID, quantity, size, and color are required" });
  }

  const qty = Number(quantity);
  if (isNaN(qty) || qty <= 0) {
    console.log("updateCartItemQuantity - Invalid quantity:", { quantity });
    return res.status(400).json({ message: "Quantity must be a positive number" });
  }

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      console.log("updateCartItemQuantity - Cart not found:", { userId, guestId });
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.product.findIndex(
      (p) => p.productId.toString() === productId && p.size === size && p.color === color
    );

    if (productIndex > -1) {
      cart.product[productIndex].quantity = qty;
      cart.totalPrice = cart.product.reduce((acc, item) => acc + item.price * item.quantity, 0);

      await cart.save();
      console.log("updateCartItemQuantity - Updated cart:", { cart });
      return res.status(200).json({
        products: cart.product,
        totalPrice: cart.totalPrice,
      });
    } else {
      console.log("updateCartItemQuantity - Product not in cart:", { productId, size, color });
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("updateCartItemQuantity - Error:", { userId, guestId, error: error.message });
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
});
