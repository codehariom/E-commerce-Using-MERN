import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice.js"
import productReducer from "./productSlice.js"
import cartReducer from "./cartSlice.js"
import checkoutReducer from "./checkoutSlice.js"
import orderReducer from "./orderSlice.js"
import adminReducer from "./adminSlice.js"
import adminProductsReducer from "./adminProductSlice.js"
import adminOrderReducer from "./adminOrderSlice.js"


export const store = configureStore({
  reducer: {
    auth:authReducer,
    products:productReducer,
    cart:cartReducer,
    checkout:checkoutReducer,
    order:orderReducer,
    admin:adminReducer,
    adminProducts:adminProductsReducer,
    adminOrder:adminOrderReducer
  },
})
