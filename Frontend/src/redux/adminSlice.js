import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// fetch all user (admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/admin/users`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    response.data;
});

// add the create user action
export const addUser = createAsyncThunk(
    "admin/addUser",
    async (userData, { rejectedWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}api/admin/users`,
                userData,
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

// update user info

export const updateUser = createAsyncThunk(
    "admin/updatedUser",
    async ({ id, name, email, role }) => {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}api/admin/users/${id}`,
            { name, email, role },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        response.data;
    }
);

//delete a user 

export const deleteUser = createAsyncThunk("admin/deleteUser",async(id)=>{
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/admin/users/${id}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
    return id 
})


// admin slice 

const adminSlice = createSlice({
    name:"admin",
    initialState:{
        users:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder

        // fetch User 
        .addCase(fetchUsers.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users= action.payload;
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message
        })

        // update user 
        .addCase(updateUser.pending,(state)=>{
            state.loading=true;
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            const updatedUser = action.payload 
            const userIndex = state.users.findIndex(
                (user)=> user._id === updateUser._id
            );
            if(userIndex !==-1){
                state.users[userIndex]=updatedUser
            }
            
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message
        })

        // delete user 
        .addCase(deleteUser.pending,(state)=>{
            state.loading=true;
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
           state.users= state.users.filter((user)=> user._id !== action.payload)
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message
        })
        // add uses
        .addCase(addUser.pending,(state)=>{
            state.loading=true;
        })
        .addCase(addUser.fulfilled,(state,action)=>{
           state.users.push(action.payload.user)
        })
        .addCase(addUser.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message
        })
    }
})

export default adminSlice.reducer