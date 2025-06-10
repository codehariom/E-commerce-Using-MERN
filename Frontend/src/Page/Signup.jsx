import React, { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex">
      <div className=" w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          action=""
          className=" w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
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
                type={showPassword ? "text" :"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" w-full p-2 border rounded"
                placeholder="Enter Your Full Name"
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
        </form>
      </div>
    </div>
  );
}

export default Signup;
