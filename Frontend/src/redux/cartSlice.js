import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [], totalPrice: 0 };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    if (!userId && !guestId) {
      console.log("fetchCart - Missing userId and guestId");
      return rejectWithValue({ message: "userId or guestId is required" });
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params: { userId, guestId },
        }
      );
      console.log("fetchCart - Success:", { userId, guestId, response: response.data });
      return response.data;
    } catch (error) {
      console.error("fetchCart - Error:", { userId, guestId, error: error.message });
      return rejectWithValue(error.response?.data || { message: "Failed to fetch cart" });
    }
  }
);

// Add an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
    if (!productId || !quantity || !size || !color) {
      console.log("addToCart - Invalid input:", { productId, quantity, size, color, guestId, userId });
      return rejectWithValue({ message: "Product ID, quantity, size, and color are required" });
    }
    if (isNaN(quantity) || quantity <= 0) {
      console.log("addToCart - Invalid quantity:", { quantity });
      return rejectWithValue({ message: "Quantity must be a positive number" });
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          size,
          color,
          guestId,
          userId,
        }
      );
      console.log("addToCart - Success:", { userId, guestId, response: response.data });
      return response.data;
    } catch (error) {
      console.error("addToCart - Error:", { userId, guestId, error: error.message });
      return rejectWithValue(error.response?.data || { message: "Failed to add to cart" });
    }
  }
);

// Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
    if (!productId || !quantity || !size || !color) {
      console.log("updateCartItemQuantity - Invalid input:", { productId, quantity, size, color, guestId, userId });
      return rejectWithValue({ message: "Product ID, quantity, size, and color are required" });
    }
    if (isNaN(quantity) || quantity <= 0) {
      console.log("updateCartItemQuantity - Invalid quantity:", { quantity });
      return rejectWithValue({ message: "Quantity must be a positive number" });
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          size,
          color,
          guestId,
          userId,
        }
      );
      console.log("updateCartItemQuantity - Success:", { userId, guestId, response: response.data });
      return response.data;
    } catch (error) {
      console.error("updateCartItemQuantity - Error:", { userId, guestId, error: error.message });
      return rejectWithValue(error.response?.data || { message: "Failed to update cart quantity" });
    }
  }
);

// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
    if (!productId || !size || !color) {
      console.log("removeFromCart - Invalid input:", { productId, size, color, guestId, userId });
      return rejectWithValue({ message: "Product ID, size, and color are required" });
    }
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        data: { productId, guestId, userId, size, color },
      });
      console.log("removeFromCart - Success:", { userId, guestId, response: response.data });
      return response.data;
    } catch (error) {
      console.error("removeFromCart - Error:", { userId, guestId, error: error.message });
      return rejectWithValue(error.response?.data || { message: "Failed to remove from cart" });
    }
  }
);

// Merge guest cart into user cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, userId }, { rejectWithValue }) => {
    if (!guestId || !userId) {
      console.log("mergeCart - Invalid input:", { guestId, userId });
      return rejectWithValue({ message: "guestId and userId are required" });
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestId, userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("mergeCart - Success:", { userId, guestId, response: response.data });
      return response.data;
    } catch (error) {
      console.error("mergeCart - Error:", { userId, guestId, error: error.message });
      return rejectWithValue(error.response?.data || { message: "Failed to merge cart" });
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [], totalPrice: 0 };
      state.error = null;
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch cart";
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add to cart";
      })

      // Update cart item quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update cart quantity";
      })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to remove from cart";
      })

      // Merge cart
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to merge cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;