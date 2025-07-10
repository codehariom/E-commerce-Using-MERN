import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/layout/UserLayout";
import Home from "./Page/Home";
import {Toaster} from "sonner"
import Login from "./Page/Login";
import Signup from "./Page/Signup";
import Profile from "./Page/Profile";
import Collection from "./Page/Collection";
import ProductDetails from "./components/products/ProductDetails";
import Checkout from "./components/cart/Checkout";
import OrderConfirmation from "./Page/OrderConfirmation";
import OrderDetails from "./Page/OrderDetails";
import MyOrderPage from "./components/products/MyOrderPage";


function App() {
  return (
    <BrowserRouter>
    <Toaster position ="top-right"/> 
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Signup/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="collection/all" element={<Collection/>}/>
          <Route path="product/:id" element={<ProductDetails/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="order-confirmation" element={<OrderConfirmation/>}/>
          <Route path ="/my-order" element={<MyOrderPage/>}/>
          <Route path="order/:id" element={<OrderDetails/>}/>
          
        </Route>
        <Route>{/*Admin Layout*/}</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
