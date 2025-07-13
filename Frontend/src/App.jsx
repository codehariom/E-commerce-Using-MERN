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
import AdminLayout from "./components/admin/AdminLayout";
import AdminHomaPage from "./Page/AdminHomaPage";
import UserManagement from "./components/admin/UserManagement";
import ProductManagement from "./components/admin/ProductManagement";
import OrderManagement from "./components/admin/OrderManagement";
import EditProductPage from "./components/admin/EditProductPage";
import NewProductPage from "./components/admin/NewProductPage";


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
        {/*Admin Layout*/}
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<AdminHomaPage/>}/>
          <Route path="users" element={<UserManagement/>}/>
          <Route path="products" element={<ProductManagement/>}/>
          <Route path="orders" element={<OrderManagement/>}/>
          <Route path="products/:id/edit" element={<EditProductPage/>}/>
          <Route path="products/new" element={<NewProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
