import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutdata, { rejectWithValue }) => {
    try {
      const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = checkoutdata;
      if (!Array.isArray(checkoutItems)) {
        throw new Error("Checkout items must be a non-empty array");
      }
      // Transform payload to match server schema
      const payload = {
        checkoutItem: checkoutItems.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          images: item.images,
        })),
        shippingAddress: {
          ...shippingAddress,
          postalCode: shippingAddress.pinCode,
        },
        paymentMethod,
        totalPrice,
      };
      delete payload.shippingAddress.pinCode;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Checkout error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: { checkout: null, loading: false, error: null },
  reducers: {
    resetCheckout: (state) => {
      state.checkout = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.checkout = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;

      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create checkout";
        state.checkout = null;
      });
  },
});

export const { resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;