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
// import OrderConfirmation from "./Page/OrderConfirmation";
import OrderDetails from "./Page/OrderDetails";
import MyOrderPage from "./components/products/MyOrderPage";
import AdminLayout from "./components/admin/AdminLayout";

import UserManagement from "./components/admin/UserManagement";
import ProductManagement from "./components/admin/ProductManagement";
import OrderManagement from "./components/admin/OrderManagement";
import EditProductPage from "./components/admin/EditProductPage";
import NewProductPage from "./components/admin/NewProductPage";
import PrivateRoute from "./routes/privateRoutes.jsx";
import AdminHomePage from "./Page/AdminHomePage.jsx";
import {Provider} from "react-redux"
import {store} from "./redux/store.js";



function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Toaster position ="top-right"/> 
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Signup/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="collection/all" element={<Collection/>}/>
          <Route path="products/:id" element={<ProductDetails/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          {/* <Route path="order-confirmation" element={<OrderConfirmation/>}/> */}
          <Route path ="/my-order" element={<MyOrderPage/>}/>
          <Route path="order/:id" element={<OrderDetails/>}/>
        </Route>
        {/*Admin Layout*/}
        <Route path="/admin" element={<PrivateRoute role="admin"><AdminLayout/></PrivateRoute>}>
          <Route index element={<AdminHomePage/>}/>
          <Route path="users" element={<UserManagement/>}/>
          <Route path="products" element={<ProductManagement/>}/>
          <Route path="orders" element={<OrderManagement/>}/>
          <Route path="products/:id/edit" element={<EditProductPage/>}/>
          <Route path="new/product" element={<NewProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider> 
  );
}

export default App;
