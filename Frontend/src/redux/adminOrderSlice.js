import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all orders
export const fetchAllOrders = createAsyncThunk(
    "adminOrder/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}api/admin/orders`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

// update all orders delevery
export const updateOrderStatus = createAsyncThunk(
    "adminOrder/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}api/admin/orders/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

//deleting orders
export const deleteOrders = createAsyncThunk(
    "adminOrder/deleteOrders",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}api/admin/orders/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            return id;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

// admin order slice

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetch all orders
            .addCase(fetchAllOrders.pending, (state) => {
                ((state.loading = true), (state.error = null));
            })
            .addCase(fetchAllOrders.fulfilled, (state, actions) => {
                ((state.loading = false), (state.orders = actions.payload));
                state.totalOrders = actions.payload.length;
                // calculate total sales
                const totalSales = actions.payload.reduce((acc, order) => {
                    return acc + order.totalPrice;
                }, 0);
                state.totalSales = totalSales;
            })
            .addCase(fetchAllOrders.rejected, (state, actions) => {
                state.loading = false;
                state.error = actions.payload.message;
            })

            // update order status
            .addCase(updateOrderStatus.pending, (state) => {
                ((state.loading = true), (state.error = null));
            })
            .addCase(updateOrderStatus.fulfilled, (state, actions) => {
                const updatedOrders = actions.payload;
                const orderIndex = state.orders.findIndex(
                    (order) => order._id === updatedOrders._id
                );
                if (orderIndex !== -1) {
                    state.orders[orderIndex] = updatedOrders;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, actions) => {
                state.loading = false;
                state.error = actions.payload.message;
            })

            //delete orders
            .addCase(deleteOrders.pending, (state) => {
                ((state.loading = true), (state.error = null));
            })
            .addCase(deleteOrders.fulfilled, (state, actions) => {
                state.orders = state.orders.filter(
                    (order) => order._id !== actions.payload
                );
            })
            .addCase(deleteOrders.rejected, (state, actions) => {
                state.loading = false;
                state.error = actions.payload.message;
            });
    },
});

export default adminOrderSlice.reducer;
