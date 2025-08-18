import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//async thunk to fetch admin products
export const fetchAdminProducts=createAsyncThunk("adminProducts/fetchProducts",async()=>{
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/admin/products`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
})

//  async to create the a new products
export const createAdminProducts=createAsyncThunk("adminProducts/createProduct",async(productData)=>{
    const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/admin/products`,productData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
})

// async thunk to update an existing product
export const updateAdminProducts=createAsyncThunk("adminProducts/updateProduct",async({id,productData})=>{
    const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/admin/products/${id}`,productData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
})


// async thunk for delete product 
export const deleteAdminProducts=createAsyncThunk("adminProducts/deleteProduct",async({id})=>{
    const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}api/admin/products/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
})

// admin product slice 

const adminProductSlice = createSlice({
    name:"adminProducts",
    initialState:{
        products:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder

        // fetch admin product 
        .addCase(fetchAdminProducts.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchAdminProducts.fulfilled,(state,actions)=>{
            state.loading=false,
            state.products= actions.payload
        })
        .addCase(fetchAdminProducts.rejected,(state,actions)=>[
            state.loading=false,
            state.error= actions.error.message
        ])

        // create admin product 
        .addCase(createAdminProducts.pending,(state)=>{
            state.loading=true
        })
        .addCase(createAdminProducts.fulfilled,(state,actions)=>{
            state.loading=false,
            state.products.push(actions.payload)
        })
        .addCase(createAdminProducts.rejected,(state,actions)=>[
            state.loading=false,
            state.error= actions.error.message
        ])

        // update admin product 
        .addCase(updateAdminProducts.pending,(state)=>{
            state.loading=true
        })
        .addCase(updateAdminProducts.fulfilled,(state,actions)=>{
            const index = state.products.findIndex((product)=> product._id===actions.payload._id)
            if(index !==-1){
                state.products[index]=actions.payload
            }
        })
        .addCase(updateAdminProducts.rejected,(state,actions)=>[
            state.loading=false,
            state.error= actions.error.message
        ])
        // delete admin product 
        .addCase(deleteAdminProducts.pending,(state)=>{
            state.loading=true
        })
        .addCase(deleteAdminProducts.fulfilled,(state,actions)=>{
            state.products = state.products.filter(
                (product)=>product._id !==actions.payload
            )
        })
        .addCase(deleteAdminProducts.rejected,(state,actions)=>[
            state.loading=false,
            state.error= actions.error.message
        ])

    }
})

export default adminProductSlice.reducer