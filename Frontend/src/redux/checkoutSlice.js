import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutdata, { rejectWithValue }) => {
    try {
      const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = checkoutdata;
      console.log('Thunk input data:', { checkoutItems, shippingAddress, paymentMethod, totalPrice }); // Debug input

      if (!Array.isArray(checkoutItems)) {
        throw new Error("Checkout items must be a non-empty array");
      }
      if (checkoutItems.length === 0) {
        throw new Error("Checkout items array is empty");
      }

      // Transform payload to match server schema
      const payload = {
        checkoutItem: checkoutItems.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color, // Note: was 'Color' in component, but 'color' here—ensure consistency
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

      const token = localStorage.getItem("token");
      console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL); // Debug URL
      console.log('Token exists:', !!token); // Debug auth
      console.log('Payload:', payload); // Debug final payload

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('API Response:', response.data); // Debug success response
      return response.data;
    } catch (error) {
      console.error("Checkout error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: import.meta.env.VITE_BACKEND_URL,
      });
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: { 
    checkout: null, 
    loading: false, 
    error: null,
    status: 'idle' // Optional: 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    setCheckout: (state, action) => {
      state.checkout = action.payload;
      state.status = 'succeeded';
    },
    resetCheckout: (state) => {
      state.checkout = null;
      state.loading = false;
      state.error = null;
      state.status = 'idle';
    },
    clearError: (state) => { // Optional: For UI to clear errors
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
        state.checkout = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
        state.status = 'succeeded';
        state.error = null;
        console.log('Slice fulfilled - checkout set to:', action.payload); // Debug state update
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message || "Failed to create checkout";
        state.status = 'failed';
        state.checkout = null;
        console.log('Slice rejected - error:', state.error); // Debug rejection
      });
  },
});

export const { resetCheckout, setCheckout, clearError } = checkoutSlice.actions;
export default checkoutSlice.reducer;