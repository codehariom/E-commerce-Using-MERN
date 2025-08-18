import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// helper function to laod cart from localStorage
const loadCartFromStorage = () => {
    const storeCart = localStorage.getItem("cart");
    return storeCart ? JSON.parse(storeCart) : { product: [] };
};

// helper function to save cart to localStorage

const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

//fetch cart for a user or guest

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({ userId, guestId }, { rejectedWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    params: { userId, guestId },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectedWithValue(error.response.data);
        }
    }
);

// add an item to the cart for user or guest id
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (
        { productId, quantity, size, color, guestId, userId },
        { rejectedWithValue }
    ) => {
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
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectedWithValue(error.response.data);
        }
    }
);

// update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async (
        { productId, quantity, size, color, guestId, userId },
        { rejectedWithValue }
    ) => {
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
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectedWithValue(error.response.data);
        }
    }
);

// remove an item from cart

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (
        { productId, guestId, userId, size, color },
        { rejectedWithValue }
    ) => {
        try {
            const response = await axios({
                method: "DELETE",
                url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                data: { productId, guestId, userId, size, color },
            });
            return response;
        } catch (error) {
            console.error(error);
            return rejectedWithValue(error.response.data);
        }
    }
);

// merge guest cart into user cart
export const mergeCart = createAsyncThunk(
    "cart/mergeCart",
    async ({ guestId, userId }, { rejectedWithValue }) => {
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
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectedWithValue(error.response.data);
        }
    }
);

// cart slice 

const cartSlice = createSlice({
     name:"cart",
     initialState:{
        cart:loadCartFromStorage(),
        loading:false,
        error:null
     },
     reducers:{
        clearCart:(state)=>{
            state.cart = {product:[]};
            localStorage.removeItem("cart")
        }
     },
     extraReducers:(builder)=>{
        builder

        // fetch cart 
        .addCase(fetchCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart = action.payload;
            saveCartToStorage(action.payload)
        })
        .addCase(fetchCart.pending,(state,action)=>{
            state.loading=false;
            state.error=action.error.message || "Failed to fetch cart "
        })

        // add to  cart 
        .addCase(addToCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart = action.payload;
            saveCartToStorage(action.payload)
        })
        .addCase(addToCart.pending,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to add to  cart "
        })

         // update cart Item quantity
        .addCase(updateCartItemQuantity.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateCartItemQuantity.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart = action.payload;
            saveCartToStorage(action.payload)
        })
        .addCase(updateCartItemQuantity.pending,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to update cart item quantity "
        })

         // remove cart  cart 
        .addCase(removeFromCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(removeFromCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart = action.payload;
            saveCartToStorage(action.payload)
        })
        .addCase(removeFromCart.pending,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to remove to cart items "
        }) 

         // merge cart from guest to user id  
        .addCase(mergeCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(mergeCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart = action.payload;
            saveCartToStorage(action.payload)
        })
        .addCase(mergeCart.pending,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to  Merge to cart  "
        })

     }
})

export const {clearCart} =cartSlice.actions;
export default cartSlice.reducer