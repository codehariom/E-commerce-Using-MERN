// aysnc thunk to fetch user orders

import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserOrder = createAsyncThunk("order/fetchUserOrder", async(fetchUserOrder,{ rejectedWithValue })=>{
try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data
} catch (error) {
    console.error(error)
    return rejectedWithValue(error.response.data)
}
})

// async thunk to fetch order details by id 
export const fetchOrderById = createAsyncThunk("order/fetchOrderById", async(orderId,{rejectedWithValue})=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        return rejectedWithValue(error.response.data)
    }
})


const orderSlice = createSlice({
    name:"orders",
    initialState:{
        orders:[],
        totalorder:0,
        orderDetails:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //fetch user orders
        .addCase(fetchUserOrder.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchUserOrder.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload
        })
        .addCase(fetchUserOrder.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message
        })

        //fetch orders by id 
        .addCase(fetchOrderById.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchOrderById.fulfilled,(state,action)=>{
            state.loading=false;
            state.orderDetails=action.payload
        })
        .addCase(fetchOrderById.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message
        })
    }
})

export default orderSlice.reducer;