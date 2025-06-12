import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/layout/UserLayout";
import Home from "./Page/Home";
import {Toaster} from "sonner"
import Login from "./Page/Login";
import Signup from "./Page/Signup";
import Profile from "./Page/Profile";
import Collection from "./Page/Collection";




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
          <Route path="collection/:collection" element={<Collection/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
