import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // display data
  //   const handleSubmit = (e) =>{
  //     e.preventDefault();
  //     console.log("user details",{name,email,password});
  //   };
  return (
    <div className="flex">
      <div className=" w-full  flex flex-col justify-center items-center p-8 md:p-12">
        <form
          //   onSubmit={handleSubmit}
          className=" w-full max-w-md bg-white p-8 rounded-lg border shadow-xl"
        >
          <div className=" flex justify-center mb-4">
            <h2 className=" text-xl font-medium">Style Pop</h2>
          </div>
          <h2 className=" text-2xl text-center font-semibold mb-3">
            {" "}
            Welcome to Style pop
          </h2>
          <p className=" text-center mb-6">Enter Your Your Details</p>
          <div className="mb-4">
            <label className=" block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" w-full p-2 border rounded"
              placeholder="Enter Your Full Name"
            />
          </div>
          <div className="mb-4">
            <label className=" block text-sm font-semibold mb-2">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" w-full p-2 border rounded"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="mb-4">
            <label className=" block text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" w-full p-2 border rounded"
                placeholder="Enter Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className=" absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-black"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className=" w-full py-2 mt-2 bg-orange-500 text-white rounded-lg font-semibold"
          >
            sign-up
          </button>
          <p className=" mt-2 text-center">
            You Have account{" "}
            <Link to="/login" className="text-blue-500">
              Sign-in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
