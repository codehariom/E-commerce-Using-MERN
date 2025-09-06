import React, { useEffect } from "react";
import MyOrderPage from "../components/products/MyOrderPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";

function Profile() {

const {user} = useSelector((state)=>state.auth);
const navigate = useNavigate()
const dispatch = useDispatch()

useEffect(()=>{
  if(!user){
    navigate("/login")
  }
},[user,navigate])

const handleLogout =()=>{
  dispatch(logout())
  dispatch(clearCart());
  navigate("/login")
}

  return (
    <div className=" min-h-screen flex flex-col">
      <div className=" flex-grow container mx-auto p-4 md:p-6">
        <div className=" flex flex-col md:flex-row md:space-x-7 space-x-7 md:space-y-3">
          {/* left side  */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-3xl md:text-3xl font-semibold mb-4">
              {user?.name}
            </h1>
            <p className=" text-xl md:text-lg mb-6">
              {user?.email}
            </p>
             <p className=" text-xl md:text-lg mb-6">
              {user?.role}
            </p>
            <button onClick={handleLogout} className=" w-full bg-orange-400 hover:text-white py-2 rounded hover:bg-orange-500 ">
              Logout
            </button>
          </div>
          {/* right section  */}
          <div className="w-full md:w-2/3 lg:w-3/4">
          <MyOrderPage/>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Profile;
